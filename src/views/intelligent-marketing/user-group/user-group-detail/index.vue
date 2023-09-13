<!--
 * @Author: ZhangYeLei
 * @Date: 2022-04-06 11:55:50
 * @LastEditTime: 2022-05-27 18:04:58
 * @LastEditors: ZhangYeLei
-->
<template>
  <div v-loading="appLoading" class="app-container">
    <el-form ref="formRef" :model="form" label-suffix="：">
      <el-divider content-position="left"><span style="font-size: 16px">基础信息</span></el-divider>
      <el-form-item label="分群名称" prop="groupName" :rules="formRules.groupName" label-width="100px">
        <el-input v-model="form.groupName" placeholder="请输入" style="width: 400px" :disabled="$route.query.type === 'edit'" />
      </el-form-item>
      <el-form-item label="产品线" prop="bizId" :rules="formRules.bizId" label-width="100px">
        <el-select v-model="form.bizId" placeholder="请选择" style="width: 400px" :disabled="$route.query.type === 'edit'" @change="(val) => handleBizIdChange(val)">
          <el-option v-for="v in intelligentMarketing.rootList" :key="v.value" :label="v.label" :value="v.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="groupTreeId" :rules="formRules.groupTreeId" label-width="100px">
        <el-cascader v-model="form.groupTreeId" :options="userGroupList" :props="{ emitPath: false }" placeholder="请选择" style="width: 400px" :disabled="$route.query.type === 'edit'" />
      </el-form-item>
      <el-form-item label="人群描述" prop="desc" :rules="formRules.desc" label-width="100px">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入" style="width: 400px" />
      </el-form-item>
      <el-form-item label="刷新机制" prop="refreshWay" :rules="formRules.refreshWay" label-width="100px">
        <el-radio-group v-model="form.refreshWay" placeholder="请输入" style="width: 400px">
          <el-radio v-for="v in refreshWayList" :key="v.value" :label="v.value">{{ v.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left"><span style="font-size: 16px">标签规则</span> <span style="font-size: 12px; color: red">（计算规则中若包含当日数据，则次日凌晨1点进行统计）</span> </el-divider>
      <div v-loading="rulesLoading" class="rule-box">
        <div class="rule-box-left rule-switch">
          <span @click="handleRuleSwitch('main')">{{ reOpMap[form.reOp] }}</span>
        </div>
        <div class="rule-box-right">
          <el-collapse v-model="activeCollapseNames">
            <el-collapse-item title="" name="basics">
              <template slot="title">
                <div class="collapse-item-title-box">
                  <span>基础属性满足</span>
                  <el-button icon="el-icon-plus" size="mini" type="text" @click="(e) => handleAddRule(e, 'basics')">添加</el-button>
                </div>
              </template>
              <div class="form-box">
                <div v-if="form.basicsForm.list.length > 1" class="rule-switch">
                  <span @click="handleRuleSwitch('basics_main')">{{ reOpMap[form.basicsForm.reOp] }}</span>
                </div>
                <div class="form-item-wrap">
                  <div v-for="(val, ind) in form.basicsForm.list" :key="ind">
                    <!-- 二级规则 -->
                    <div v-if="val.hasOwnProperty('list')" class="form-box">
                      <div v-if="val.list.length > 1" class="rule-switch">
                        <span @click="handleRuleSwitch('basics_vice', ind)">{{ reOpMap[val.reOp] }}</span>
                      </div>
                      <div class="form-item-wrap">
                        <div v-for="(v, i) in val.list" :key="i" class="form-item-bar">
                          <div class="form-item-box">
                            <el-cascader v-model="v.id" style="width: 200px" :options="userPropData" :show-all-levels="false" filterable :props="{emitPath: false, leaf: 'isLeaf', children: 'childList'}" @change="(value) => hanldeBasicsUserAttrChange('basics_vice', value, ind, i)" />
                            <el-select v-model="v.opCode" style="width: 100px" @change="handleBasicsUserSelectChange('basics_vice', ind, i)">
                              <el-option v-for="option in v.ops" :key="option.value" :label="option.label" :value="option.value" />
                            </el-select>
                            <!-- 时间类型，有单个时间及时间区间 -->
                            <div v-if="v.dataType === 'DATETIME'">
                              <el-date-picker
                                v-if="v.opCode === 'DATETIME_RANGE'"
                                v-model="v.value"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                              />
                              <div v-else>
                                <el-input-number v-model="v.value" controls-position="right" step-strictly :min="1" />
                                <span>天</span>
                              </div>
                            </div>
                            <!-- 布尔类型，通常是是和否的单选 -->
                            <div v-else-if="v.dataType === 'BOOL'">
                              <el-select v-model="v.value" style="width: 100px">
                                <el-option v-for="option in v.dictList" :key="option.value" :label="option.label" :value="option.value" />
                              </el-select>
                            </div>
                            <!-- 字符串和列表类型，一般为下拉多选 -->
                            <div v-else-if="v.dataType === 'STRING' || v.dataType === 'LIST'">
                              <el-select
                                v-model="v.value"
                                multiple
                                filterable
                                reserve-keyword
                                remote
                                :remote-method="(query) => handleBasicsDictListSearch(query, 'vice', v.id.split('-')[1], ind, i, v.dictListCache)"
                                placeholder="请选择(支持搜索)"
                                :loading="loadings._big_data_client_profile_group_listDictOfUserProps"
                                @change="(vals) => handleBasicsDictListChange(vals, v.dictList, v.dictListCache, 'vice', ind, i)"
                              >
                                <el-option v-for="option in v.dictList" :key="option.code" :label="option.label" :value="option.value" />
                              </el-select>
                            </div>
                            <!-- 数字类型，有单个输入和区间输入 -->
                            <div v-else-if="v.dataType === 'NUMBER'">
                              <div v-if="v.opCode === 'NUM_RANGE'">
                                <el-input-number v-model="v.value" controls-position="right" step-strictly :min="1" />
                                <span> - </span>
                                <el-input-number v-model="v.value2" controls-position="right" step-strictly :min="1" />
                              </div>
                              <el-input-number v-else v-model="v.value" controls-position="right" step-strictly :min="1" />
                            </div>
                          </div>
                          <div class="form-item-action-box">
                            <el-button v-if="i === val.list.length - 1" icon="el-icon-plus" size="mini" type="text" @click="handleAddRule('', 'basics_vice', ind)">新增</el-button>
                            <el-button icon="el-icon-delete" size="mini" type="text" style="color: #f56c6c" @click="handleDeleteRule('basics_vice', ind, i)">删除</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 一级规则 -->
                    <div v-else class="form-item-bar">
                      <div class="form-item-box">
                        <!--  -->
                        <el-cascader v-model="val.id" style="width: 200px" :options="userPropData" :show-all-levels="false" filterable :props="{emitPath: false, leaf: 'isLeaf', children: 'childList'}" @change="(value) => hanldeBasicsUserAttrChange('basics_main', value, ind)" />
                        <el-select v-model="val.opCode" style="width: 100px" @change="handleBasicsUserSelectChange('basics_main', ind)">
                          <el-option v-for="option in val.ops" :key="option.value" :label="option.label" :value="option.value" />
                        </el-select>
                        <!-- 时间类型，有单个时间及时间区间的 -->
                        <div v-if="val.dataType === 'DATETIME'">
                          <el-date-picker
                            v-if="val.opCode === 'DATETIME_RANGE'"
                            v-model="val.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                          <div v-else>
                            <el-input-number v-model="val.value" controls-position="right" step-strictly :min="1" />
                            <span>天</span>
                          </div>
                        </div>
                        <!-- 布尔类型，通常是是和否的单选 -->
                        <div v-else-if="val.dataType === 'BOOL'">
                          <el-select v-model="val.value" style="width: 100px">
                            <el-option v-for="option in val.dictList" :key="option.code" :label="option.label" :value="option.value" />
                          </el-select>
                        </div>
                        <!-- 字符串和列表类型，一般为下拉多选 -->
                        <div v-else-if="val.dataType === 'STRING' || val.dataType === 'LIST'">
                          <el-select
                            v-model="val.value"
                            multiple
                            filterable
                            reserve-keyword
                            remote
                            :remote-method="(query) => handleBasicsDictListSearch(query, 'main', val.id.split('-')[1], ind, '', val.dictListCache)"
                            placeholder="请选择(支持搜索)"
                            :loading="loadings._big_data_client_profile_group_listDictOfUserProps"
                            @change="(vals) => handleBasicsDictListChange(vals, val.dictList, val.dictListCache, 'main', ind)"
                          >
                            <el-option v-for="option in val.dictList" :key="option.code" :label="option.label" :value="option.value" />
                          </el-select>
                        </div>
                        <!-- 数字类型，有单个输入和区间输入 -->
                        <div v-else-if="val.dataType === 'NUMBER'">
                          <div v-if="val.opCode === 'NUM_RANGE'">
                            <el-input-number v-model="val.value" controls-position="right" step-strictly :min="1" />
                            <span> - </span>
                            <el-input-number v-model="val.value2" controls-position="right" step-strictly :min="1" />
                          </div>
                          <el-input-number v-else v-model="val.value" controls-position="right" step-strictly :min="1" />
                        </div>
                      </div>
                      <!-- 操作条 -->
                      <div class="form-item-action-box">
                        <el-button icon="el-icon-plus" size="mini" type="text" @click="handleAddRule('', 'basics_main', ind)">新增</el-button>
                        <el-button icon="el-icon-delete" size="mini" type="text" style="color: #f56c6c" @click="handleDeleteRule('basics_main', ind)">删除</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>

            <el-collapse-item title="行为属性满足" name="behavior">
              <template slot="title">
                <div class="collapse-item-title-box">
                  <span>行为属性满足</span>
                  <el-button icon="el-icon-plus" size="mini" type="text" @click="(e) => handleAddRule(e, 'behavior')">添加</el-button>
                </div>
              </template>
              <div class="form-box">
                <div v-if="form.behaviorForm.list.length > 1" class="rule-switch">
                  <span @click="handleRuleSwitch('behavior_main')">{{ reOpMap[form.behaviorForm.reOp] }}</span>
                </div>
                <div class="form-item-wrap">
                  <div v-for="(val, ind) in form.behaviorForm.list" :key="ind">
                    <!-- 二级行为规则 -->
                    <div v-if="val.hasOwnProperty('list')" class="form-box">
                      <div v-if="val.list.length > 1" class="rule-switch">
                        <span @click="handleRuleSwitch('behavior_vice', ind)">{{ reOpMap[val.reOp] }}</span>
                      </div>
                      <div class="form-item-wrap">
                        <div v-for="(v, i) in val.list" :key="i">
                          <div class="form-item-bar">
                            <div class="form-item-box">
                              <!-- 时间范围 -->
                              <el-select v-model="v.triggerTimeType" style="width: 120px">
                                <el-option v-for="option in behavior_time_list" :key="option.value" :label="option.label" :value="option.value" />
                              </el-select>
                              <!-- 时间区间 -->
                              <el-date-picker
                                v-if="v.triggerTimeType === 'RANGE'"
                                v-model="v.dateTimeRangeValue"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                              />
                              <!-- 行为属性规则 目前仅为做过｜未做作-->
                              <el-select v-model="v.actionType" style="width: 100px">
                                <el-option v-for="option in behavior_attr_rules" :key="option.value" :label="option.label" :value="option.value" />
                              </el-select>
                              <!-- 行为属性下拉列表 -->
                              <el-cascader
                                v-model="v.id"
                                placeholder="请选择(支持搜索)"
                                style="width: 200px"
                                filterable
                                clearable
                                :show-all-levels="false"
                                :props="{emitPath: false, leaf: 'isLeaf', children: 'childList'}"
                                :options="eventData"
                                @change="(val) => handleBehaviorAttrChange('vice', val.split('-')[1], ind, i)"
                              />
                              <!-- 添加筛选 -->
                              <el-button icon="el-icon-plus" size="mini" type="text" @click="handleAddBehaviorScreen('behavior_vice', true, ind, i)">添加筛选</el-button>
                            </div>
                            <!-- 操作栏 -->
                            <div class="form-item-action-box">
                              <el-button icon="el-icon-plus" size="mini" type="text" @click="handleAddRule('', 'behavior_vice', ind, i)">新增</el-button>
                              <el-button icon="el-icon-delete" size="mini" type="text" style="color: #f56c6c" @click="handleDeleteRule('behavior_vice', ind, i)">删除</el-button>
                            </div>
                          </div>
                          <!-- 所添加的筛选，且支持多个 -->
                          <div v-if="v.props.length" class="form-item-box extra-screen-box behavior-form-item-bar">
                            <div class="extra-screen-left">并且满足</div>
                            <div class="extra-screen-content">
                              <div v-if="v.props.length > 1" class="extra-screen-content-left">
                                <el-button disabled size="mini">且</el-button>
                              </div>
                              <div class="extra-screen-content-right">
                                <div v-for="(value, index) in v.props" :key="index" class="extra-screen-content-item-bar">
                                  <!-- 筛选属性列表 -->
                                  <el-select v-model="v.props[index].id" @change="(val) => handleBehaviorScreenChange('screen_vice', val, ind, i, index)">
                                    <el-option v-for="option in v.rules" :key="option.value" :label="option.label" :value="option.value" />
                                  </el-select>
                                  <!-- 规则 -->
                                  <el-select v-model="v.props[index].opCode" style="width: 100px">
                                    <el-option v-for="option in value.ops" :key="option.value" :label="option.label" :value="option.value" />
                                  </el-select>
                                  <!-- 属性的值 -->
                                  <!-- 时间类型，有单个时间及时间区间的 -->
                                  <div v-if="value.dataType === 'DATETIME'">
                                    <el-date-picker
                                      v-if="value.opCode === 'DATETIME_RANGE'"
                                      v-model="v.props[index].value"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                    />
                                    <div v-else>
                                      <el-input-number v-model="v.props[index].value" controls-position="right" step-strictly :min="1" />
                                      <span>天</span>
                                    </div>
                                  </div>
                                  <!-- 布尔类型，通常是是和否的单选 -->
                                  <div v-else-if="value.dataType === 'BOOL'">
                                    <el-select v-model="v.props[index].value" style="width: 100px">
                                      <el-option v-for="option in value.dictList" :key="option.code" :label="option.label" :value="option.value" />
                                    </el-select>
                                  </div>
                                  <!-- 字符串和列表类型，一般为下拉多选 -->
                                  <div v-else-if="value.dataType === 'STRING' || value.dataType === 'LIST'">
                                    <el-select v-model="v.props[index].value" multiple filterable reserve-keyword remote :remote-method="(query) => handleBehaviorDictListSearch('vice', query, v.props[index].id, ind, index, i)" placeholder="请选择(支持搜索)" :loading="loadings._big_data_client_profile_group_listDictOfEventProps">
                                      <el-option v-for="option in value.dictList" :key="option.code" :label="option.label" :value="option.value" />
                                    </el-select>
                                  </div>
                                  <!-- 数字类型，有单个输入和区间输入 -->
                                  <div v-else-if="value.dataType === 'NUMBER'">
                                    <div v-if="value.opCode === 'NUM_RANGE'">
                                      <el-input-number v-model="v.props[index].value" controls-position="right" step-strictly :min="1" />
                                      <span> - </span>
                                      <el-input-number v-model="v.props[index].value2" controls-position="right" step-strictly :min="1" />
                                    </div>
                                    <el-input-number v-else v-model="v.props[index].value" controls-position="right" step-strictly :min="1" />
                                  </div>

                                  <!-- 删除此筛选项 -->
                                  <el-button icon="el-icon-close" size="mini" type="text" @click="handleAddBehaviorScreen('behavior_vice', false, ind, i, index)" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 只有当某些行为 做过 才会出现总次数等 -->
                          <div v-if="v.actionType === 'do'" class="form-item-box behavior-form-item-bar">
                            <el-select v-model="v.eventCountop" style="width: 100px">
                              <el-option v-for="option in behavior_times_list" :key="option.value" :label="option.label" :value="option.value" />
                            </el-select>
                            <el-select v-model="v.eventCountopCode" style="width: 100px">
                              <el-option v-for="option in behavior_times_rules" :key="option.value" :label="option.label" :value="option.value" />
                            </el-select>
                            <el-input-number v-model="v.eventCountopValue" controls-position="right" step-strictly :min="1" />
                            <span>次</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 一级行为规则 -->
                    <template v-else>
                      <div class="form-item-bar">
                        <div class="form-item-box">
                          <!-- 时间范围 -->
                          <el-select v-model="val.triggerTimeType" style="width: 120px">
                            <el-option v-for="option in behavior_time_list" :key="option.value" :label="option.label" :value="option.value" />
                          </el-select>
                          <!-- 时间区间 -->
                          <el-date-picker
                            v-if="val.triggerTimeType === 'RANGE'"
                            v-model="val.dateTimeRangeValue"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                          <!-- 行为属性规则 目前仅为做过｜未做作-->
                          <el-select v-model="val.actionType" style="width: 100px">
                            <el-option v-for="option in behavior_attr_rules" :key="option.value" :label="option.label" :value="option.value" />
                          </el-select>
                          <!-- 行为属性下拉列表 -->
                          <el-cascader
                            v-model="val.id"
                            placeholder="请选择(支持搜索)"
                            style="width: 200px"
                            filterable
                            clearable
                            :show-all-levels="false"
                            :props="{emitPath: false, leaf: 'isLeaf', children: 'childList'}"
                            :options="eventData"
                            @change="(val) => handleBehaviorAttrChange('main', val.split('-')[1], ind)"
                          />
                          <!-- 添加筛选 -->
                          <el-button icon="el-icon-plus" size="mini" type="text" @click="handleAddBehaviorScreen('behavior_main', true, ind)">添加筛选</el-button>
                        </div>
                        <!-- 操作栏 -->
                        <div class="form-item-action-box">
                          <el-button icon="el-icon-plus" size="mini" type="text" @click="handleAddRule('', 'behavior_main', ind)">新增</el-button>
                          <el-button icon="el-icon-delete" size="mini" type="text" style="color: #f56c6c" @click="handleDeleteRule('behavior_main', ind)">删除</el-button>
                        </div>
                      </div>
                      <!-- 所添加的筛选，且支持多个 -->
                      <div v-if="val.props.length" class="form-item-box extra-screen-box behavior-form-item-bar">
                        <div class="extra-screen-left">并且满足</div>
                        <div class="extra-screen-content">
                          <div v-if="val.props.length > 1" class="extra-screen-content-left">
                            <el-button disabled size="mini">且</el-button>
                          </div>
                          <div class="extra-screen-content-right">
                            <div v-for="(value, index) in val.props" :key="index" class="extra-screen-content-item-bar">
                              <!-- 筛选属性列表 -->
                              <el-select v-model="val.props[index].id" @change="(val) => handleBehaviorScreenChange('screen_main', val, ind, '', index)">
                                <el-option v-for="option in val.rules" :key="option.value" :label="option.label" :value="option.value" :disabled="!option.status" />
                              </el-select>
                              <!-- 规则 -->
                              <el-select v-model="val.props[index].opCode" style="width: 100px">
                                <el-option v-for="option in val.props[index].ops" :key="option.value" :label="option.label" :value="option.value" />
                              </el-select>
                              <!-- 属性的值 -->
                              <!-- 时间类型，有单个时间及时间区间的 -->
                              <div v-if="value.dataType === 'DATETIME'">
                                <el-date-picker
                                  v-if="value.opCode === 'DATETIME_RANGE'"
                                  v-model="val.props[index].value"
                                  type="daterange"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                />
                                <div v-else>
                                  <el-input-number v-model="val.props[index].value" controls-position="right" step-strictly :min="1" />
                                  <span>天</span>
                                </div>
                              </div>
                              <!-- 布尔类型，通常是是和否的单选 -->
                              <div v-else-if="value.dataType === 'BOOL'">
                                <el-select v-model="val.props[index].value" style="width: 100px">
                                  <el-option v-for="option in value.dictList" :key="option.code" :label="option.label" :value="option.value" />
                                </el-select>
                              </div>
                              <!-- 字符串和列表类型，一般为下拉多选 -->
                              <div v-else-if="value.dataType === 'STRING' || value.dataType === 'LIST'">
                                <el-select v-model="val.props[index].value" multiple filterable reserve-keyword remote :remote-method="(query) => handleBehaviorDictListSearch('main', query, val.props[index].id, ind, index)" placeholder="请选择(支持搜索)" :loading="loadings._big_data_client_profile_group_listDictOfEventProps">
                                  <el-option v-for="option in value.dictList" :key="option.code" :label="option.label" :value="option.value" />
                                </el-select>
                              </div>
                              <!-- 数字类型，有单个输入和区间输入 -->
                              <div v-else-if="value.dataType === 'NUMBER'">
                                <div v-if="value.opCode === 'NUM_RANGE'">
                                  <el-input-number v-model="val.props[index].value" controls-position="right" step-strictly :min="1" />
                                  <span> - </span>
                                  <el-input-number v-model="val.props[index].value2" controls-position="right" step-strictly :min="1" />
                                </div>
                                <el-input-number v-else v-model="val.props[index].value" controls-position="right" step-strictly :min="1" />
                              </div>

                              <!-- 删除此筛选项 -->
                              <el-button icon="el-icon-close" size="mini" type="text" @click="handleAddBehaviorScreen('behavior_main', false, ind, '', index)" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 只有当某些行为 做过 才会出现总次数等 -->
                      <div v-if="val.actionType === 'do'" class="form-item-box behavior-form-item-bar">
                        <el-select v-model="val.eventCountop" style="width: 100px">
                          <el-option v-for="option in behavior_times_list" :key="option.value" :label="option.label" :value="option.value" />
                        </el-select>
                        <el-select v-model="val.eventCountopCode" style="width: 100px">
                          <el-option v-for="option in behavior_times_rules" :key="option.value" :label="option.label" :value="option.value" />
                        </el-select>
                        <el-input-number v-model="val.eventCountopValue" controls-position="right" step-strictly :min="1" />
                        <span>次</span>
                      </div>

                    </template>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <p style="margin-top: 26px">
        <el-button icon="el-icon-check" type="primary" plain @click="onFormSubmit">{{ $route.query.type === 'edit' ? '编辑': '创建' }}</el-button>
        <el-button icon="el-icon-back" plain @click="handleBackPage">返回</el-button>
      </p>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { cloneDeep, debounce, uniqWith, isEqual } from 'lodash'
import {
  getGroupTreeByRootId,
  listEventPropsDropdown,
  listDictOfEventProps,
  listDictOfUserProps,
  addUserGroup,
  editUserGroup,
  getEditById
} from '@/api/intelligentMarketing'
import { getToken } from '@/utils/auth'
import {
  formRules,
  init_basics_form,
  init_behavior_form,
  init_behavior_screen_form,
  behavior_attr_rules,
  behavior_times_rules,
  behavior_times_list,
  behavior_time_list
} from './config'
import { transferData, transferData2, transferData4 } from '../utils'
import moment from 'moment'

const uid = getToken('userId')
const uname = getToken('cname')

export default {
  name: 'UserGroupDetail',
  props: {

  },
  data() {
    return {
      behavior_attr_rules,
      behavior_times_list,
      behavior_times_rules,
      behavior_time_list,
      reOpMap: {
        'and': '且',
        'or': '或'
      },
      form: {
        // 基础属性
        groupName: '', // 分群名称
        bizId: '', // 业务线
        groupTreeId: '', // 分类
        description: '', // 分群描述
        refreshWay: '', // 刷新机制
        // 行为属性
        reOp: 'and', // 关系运算符 and 且，or 或
        basicsForm: {
          reOp: 'and',
          list: []
        },
        behaviorForm: {
          reOp: 'and',
          list: []
        }
      },
      formRules,
      activeCollapseNames: [],
      refreshWayList: [{ label: '手动刷新', value: 0 }, { label: '每日凌晨1点自动刷新', value: 1 }],
      userGroupList: [], // 人群分类list
      userPropData: [], // 基础属性级联选择
      eventData: [] // 行为属性级联选择
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState(['intelligentMarketing']),
    rulesLoading() {
      const { loadings } = this
      return loadings._big_data_client_profile_group_listUserPropsDropdown ||
        loadings._big_data_client_profile_group_listEventDropdown ||
        loadings._big_data_client_profile_group_listEventPropsDropdown ||
        loadings._big_data_client_profile_group_listDictOfUserProps
    },
    appLoading() {
      const { loadings } = this
      return loadings._big_data_client_profile_group_add ||
       loadings._big_data_client_profile_group_getGroupTreeByRootId_1 ||
       loadings._big_data_client_profile_group_getGroupTreeByRootId_2 ||
       loadings._big_data_client_profile_group_getGroupTreeByRootId_3 ||
       loadings._big_data_client_profile_group_edit ||
       loadings._big_data_client_profile_listAllUserPropDropdownWithBiz ||
       loadings._big_data_client_profile_listAllEventDropdownWithBiz
    }
  },
  async mounted() {
    if (this.$route.query.type === 'edit') {
      await this.getPropsData()
      this.getEditById()
    } else {
      this.getPropsData()
    }
  },
  methods: {
    /**
     * 缓存选中的基础属性item
     * @param {array} ids 选中的基础属性value
     * @param {array} dictList 基础属性列表
     * @param {array} dictListCache 已缓存的
     * @param {string} type main vice
     * @param {number} ind main 下标
     * @param {number} i vice 下标
     */
    handleBasicsDictListChange(ids, dictList, dictListCache = [], type, ind, i) {
      const cacheList = []
      if (ids.length) {
        dictList.forEach(v => {
          if (ids.includes(v.value)) {
            cacheList.push(v)
          }
        })
      }
      const newDictListCache = uniqWith([...dictListCache, ...cacheList], isEqual)
      if (type === 'main') {
        this.$set(this.form.basicsForm.list, ind, { ...this.form.basicsForm.list[ind], dictListCache: newDictListCache })
      } else {
        this.$set(this.form.basicsForm.list[ind].list, i, { ...this.form.basicsForm.list[ind].list[i], dictListCache: newDictListCache })
      }
    },
    // 获取基础属性与行为属性 树形列表
    getPropsData() {
      return new Promise((resolve) => {
        Promise.all([this.$store.dispatch('intelligentMarketing/getUserPropData'), this.$store.dispatch('intelligentMarketing/getEventData')])
          .then(res => {
            this.userPropData = cloneDeep(res[0])
            this.eventData = cloneDeep(res[1])

            resolve()
          })
      })
    },
    // 获取编辑数据
    getEditById() {
      const { $route: { query: { id }}} = this
      getEditById({ id })
        .then(async res => {
          const { result: { bizId, desc, groupName, groupTreeId, refreshWay, rules: { events, reOp, userProps }}} = res
          const initForm = { bizId: bizId + '', desc, groupName, groupTreeId: groupTreeId + '', refreshWay, reOp }
          const basicsForm = { reOp: 'and', list: [] }
          const behaviorForm = { reOp: 'and', list: [] }
          // 防止一次性插入过量DOM 分批回显值
          this.form = { ...initForm, basicsForm, behaviorForm }
          // 获取当前业务线的分类数据
          this.handleGetGroupData(bizId)

          // 基础属性处理
          if (userProps?.userProps?.length && userProps.userProps[0].props?.length) {
            this.activeCollapseNames.push('basics')
            const { reOp, userProps: userProp } = userProps
            // dataType为 STRING｜LIST 的属性，还需要根据属性的id去动态获取其对应的属性列表，所以需要批量请求
            const requestList = []
            userProp.forEach(v => {
              v.props.forEach(val => {
                // 需回显编辑数据
                const dictListCacheTemp = []
                if (['LIST', 'STRING'].includes(val.dataType) && val.value?.val?.length) {
                  val.value.val.forEach((v, i) => {
                    dictListCacheTemp.push({
                      dictCode: val.value.dictCode,
                      key: val.value.keys[i],
                      value: val.value.keys[i],
                      label: v,
                      val: v
                    })
                  })
                }

                if (['LIST', 'STRING', 'BOOL'].includes(val.dataType)) {
                  requestList.push(new Promise(resolve => {
                    listDictOfUserProps({ propId: val.id, val: '', limit: 100 })
                      .then(res => {
                        resolve({ dictList: transferData4(res.result), dictListCache: dictListCacheTemp })
                      })
                  })
                  )
                } else {
                  requestList.push(Promise.resolve({ dictList: [], dictListCache: [] }))
                }
              })
            })

            await Promise.all(requestList)
              .then(res => {
                let index = -1 // 与requestList resolve的下标对应
                basicsForm.reOp = reOp || 'and'
                basicsForm.list = userProp.map((v, i) => {
                  if (v.props?.length === 1) {
                    return this.handleAssembleEditBasicsForm(v.props[0], res, i)
                  } else if (v.props.length > 1) {
                    const { reOp, props } = v
                    return { reOp, list: props.map((val) => this.handleAssembleEditBasicsForm(val, res, ++index)) }
                  }
                })
              })
          }
          this.form.basicsForm = basicsForm

          // 行为数据值处理
          if (events?.events?.length && events.events[0].events?.length) {
            this.activeCollapseNames.push('behavior')
            const { events: event, reOp } = events
            // 每条行为数据的行为属性都对应着一个子属性行为列表用来筛选，所以需要批量请求
            const requestList = []
            event.forEach(v => {
              v.events.forEach(val => {
                requestList.push(new Promise(resolve => {
                  listEventPropsDropdown({ eventId: val.id })
                    .then(res => {
                      // 过滤禁用属性
                      const allRules = transferData2(res.result)
                      const rules = allRules.filter(v => v.status === 1)
                      resolve({ allRules, rules })
                    })
                }))
              })
            })
            await Promise.all(requestList).then(res => {
              let index = -1 // 与requestList resolve的下标对应
              // 拿到子行为属性列表后再与其对应的行为属性数据匹配组合数据
              behaviorForm.reOp = reOp || 'and'
              behaviorForm.list = event.map((v, i) => {
                if (v.events.length === 1) {
                  return this.handleAssembleEditBehaviorForm(v.events[0], res, i)
                } else if (v.events.length > 1) {
                  const { reOp, events } = v
                  return { reOp, list: events.map((val, ind) => this.handleAssembleEditBehaviorForm(val, res, ++index)) }
                }
              })
            })
          }
          this.form.behaviorForm = behaviorForm
          console.log('initForm', this.form)
        })
    },
    // 组装编辑基础数据
    handleAssembleEditBasicsForm(val, res, i) {
      const { value, id, dataType, opCode } = val
      const { ops, type } = this.handleFindOps(id, this.userPropData)
      const { dictList, dictListCache } = res[i]
      const allDictList = uniqWith([...dictList, ...dictListCache], isEqual) // 去重
      const newValue = this.handleEditCommonForm({ value, dataType, opCode })
      return { ...val, ...newValue, id: `${type}-${id}`, ops, dictList: allDictList, dictListCache }
    },
    // 组装编辑行为数据
    handleAssembleEditBehaviorForm(value, res, i) {
      const { id, props, triggerTimeType, dateTimeRangeValue, eventCountProp: { opCode: eventCountopCode, value: eventCountopValue }} = value
      const rules = res[i]
      const { type } = this.handleFindOps(id, this.eventData)
      if (props?.length) {
        value.props = props.map(v => {
          const { value, id, dataType, opCode } = v
          const currentItem = rules.allRules.filter(val => val.id === id)[0]
          const { ops, dictList, status } = currentItem
          const newValue = this.handleEditCommonForm({ value, dataType, opCode })
          // 已选中禁用的数据需要回显
          if (status === 0) {
            rules.rules.push(currentItem)
          }
          return { ...v, ...newValue, id: id + '', ops, dictList }
        })
      } else {
        value.props = []
      }
      if (triggerTimeType === 'RANGE') {
        value.dateTimeRangeValue = [moment(dateTimeRangeValue.beginTime), moment(dateTimeRangeValue.endTime)]
      }
      return { ...value, id: `${type}-${id}`, eventCountopCode, eventCountopValue, eventCountop: 'totals', rules: rules.rules }
    },
    // 与handleCommonForm类似的处理，编辑时反向操作一波
    handleEditCommonForm(values) {
      const { dataType, value, opCode } = values
      const newValue = { value: '' }
      if (dataType === 'STRING' || dataType === 'LIST') {
        newValue.value = value.keys
      } else if (dataType === 'BOOL') {
        newValue.value = value.key
      } else if (dataType === 'NUMBER') {
        if (opCode === 'NUM_RANGE') { // 区间为两个值
          newValue.value = value.beginNum
          newValue.value2 = value.endNum
        } else {
          newValue.value = value.val
        }
      } else if (dataType === 'DATETIME') {
        if (opCode === 'DATETIME_RANGE') {
          newValue.value = [moment(value.beginTime), moment(value.endTime)]
        } else {
          newValue.value = value.days
        }
      }
      return newValue
    },
    // 产品线切换
    handleBizIdChange() {
      const { form: { bizId: rootId }} = this
      this.handleGetGroupData(rootId)
      // 清空相关子数据
      this.form.groupTreeId = ''
    },
    // 根据产品线不同获取对应的分类等
    handleGetGroupData(rootId) {
      return new Promise(resolve => {
        getGroupTreeByRootId({ rootId })
          .then(res => {
            this.userGroupList = transferData(res.result)
            resolve()
          })
      })
    },
    // 从基础属性活行为属性的树形数据中 获取与id对应的叶节点：即属性结点的那条数据
    handleFindOps(id, list) {
      const isLeafItems = []
      const handleIsLeafItem = (list) => {
        list.forEach(v => {
          if (v.isLeaf) {
            isLeafItems.push(v)
          }
          if (v.childList?.length) {
            handleIsLeafItem(v.childList)
          }
        })
      }
      handleIsLeafItem(list)
      return isLeafItems.filter(v => (v.value === id || v.id === id))[0]
    },
    /**
     * @description 基础属性 选择用户属性要设置对应的属性规则及值的输入类型等
     * @param {string} type basics_main 一级规则；basics_vice 二级规则
     * @param {number} val 当前属性值
     * @param {number} ind 一级规则下标
     * @param {number} i 二级规则下标
     */
    hanldeBasicsUserAttrChange(type, val, ind, i) {
      const selectItem = this.handleFindOps(val, this.userPropData)
      const { ops, dataType, dictList } = selectItem
      if (type === 'basics_main') {
        // 获取当前属性值的下拉规则
        this.$set(this.form.basicsForm.list, ind, {
          ...this.form.basicsForm.list[ind],
          ops,
          dictList,
          dataType,
          value: '',
          value2: '',
          opCode: ops[0].value
        })
        if (['STRING', 'LIST', 'BOOL'].includes(dataType)) {
          const id = val.split('-')[1]
          this.handleBasicsDictListSearch('', 'main', id, ind)
        }
      } else if (type === 'basics_vice') {
        this.$set(this.form.basicsForm.list[ind].list, i, {
          ...this.form.basicsForm.list[ind].list[i],
          ops,
          dictList,
          dataType,
          value: '',
          value2: '',
          opCode: ops[0].value
        })
        if (['STRING', 'LIST', 'BOOL'].includes(dataType)) {
          const id = val.split('-')[1]
          this.handleBasicsDictListSearch('', 'vice', id, ind, i)
        }
      }
    },
    /**
     * @description 用户属性所对应的规则改变时，如等于、包含等
     */
    handleBasicsUserSelectChange(type, ind, i) {
      if (type === 'basics_main') {
        // 防止不同类型规则下值的混淆、清除值
        this.$set(this.form.basicsForm.list, ind, { ...this.form.basicsForm.list[ind], value: '', value2: '' })
      } else if (type === 'basics_vice') {
        this.$set(this.form.basicsForm.list[ind].list, i, { ...this.form.basicsForm.list[ind].list[i], value: '', value2: '' })
      }
    },
    /**
     * @description 行为属性 选中某个行为后要获取当前行为下的筛选属性规则
     * @param {string} type main: 一级规则 vice: 二级规则
     * @param {string} val  搜索关键字
     * @param {number} ind  当前一级行为属性规则下标
     * @param {number} i  当前二级行为属性规则下标
     */
    async handleBehaviorAttrChange(type, val, ind, i) {
      if (!val) return
      const res = await listEventPropsDropdown({ eventId: val })
      const allRules = transferData2(res.result)
      // 过滤禁用
      const rules = allRules.filter(v => v.status === 1)
      if (type === 'main') {
        this.$set(this.form.behaviorForm.list, ind, { ...this.form.behaviorForm.list[ind], rules, props: [] })
      } else if (type === 'vice') {
        this.$set(this.form.behaviorForm.list[ind].list, i, { ...this.form.behaviorForm.list[ind].list[i], rules, props: [] })
      }
    },
    /**
     * @description 添加一条规则
     * @param {object} e 事件原生对象
     * @param {string} type basics: 基础属性增加一条一级规则；basics_main：基础属性一级规则增加一条变为二级规则；basics_vice: 基础属性二级规则追加一条。（behavior、bahavior_main、bahavior_vice同上）
     * @param {number} ind  追加一条二级规则的时候其对应的一级规则下标
     */
    handleAddRule(e, type, ind) {
      const { basicsForm, behaviorForm } = this.form
      // 控制展开的折叠面板
      if (['basics', 'behavior'].includes(type)) {
        this.activeCollapseNames = this.activeCollapseNames.includes(type) ? this.activeCollapseNames : this.activeCollapseNames.concat(type)
      }
      if (type === 'basics') {
        this.form.basicsForm.list = this.form.basicsForm.list.concat(cloneDeep(init_basics_form))
      } else if (type === 'basics_main') {
        this.$set(this.form.basicsForm.list, ind, { reOp: 'and', list: [basicsForm.list[ind], cloneDeep(init_basics_form)] })
      } else if (type === 'basics_vice') {
        this.form.basicsForm.list[ind].list = basicsForm.list[ind].list.concat(cloneDeep(init_basics_form))
      } else if (type === 'behavior') {
        this.form.behaviorForm.list = this.form.behaviorForm.list.concat(cloneDeep(init_behavior_form))
      } else if (type === 'behavior_main') {
        this.$set(this.form.behaviorForm.list, ind, { reOp: 'and', list: [behaviorForm.list[ind], cloneDeep(init_behavior_form)] })
      } else if (type === 'behavior_vice') {
        this.form.behaviorForm.list[ind].list = behaviorForm.list[ind].list.concat(cloneDeep(init_behavior_form))
      }
      // 阻止事件冒泡到折叠面板父元素
      e && e.stopPropagation()
    },
    /**
     * @description 切换 且/或 规则
     * @param {string} type main: 切换基础属性/行为属性 且/或 规则；basics_main: 切换基础属性一级规则；basics_vice: 切换基础属性二级规则。（behavior_main、behavior_vice行为属性同上）
     * @param {number} ind  一级规则下标
     */
    handleRuleSwitch(type, ind) {
      const { reOp, basicsForm, behaviorForm } = this.form
      if (type === 'main') {
        this.form.reOp = this.handleRuleSwitchUtil(reOp)
      } else if (type === 'basics_main') {
        this.form.basicsForm.reOp = this.handleRuleSwitchUtil(basicsForm.reOp)
      } else if (type === 'basics_vice') {
        this.form.basicsForm.list[ind].reOp = this.handleRuleSwitchUtil(basicsForm.list[ind].reOp)
      } else if (type === 'behavior_main') {
        this.form.behaviorForm.reOp = this.handleRuleSwitchUtil(behaviorForm.reOp)
      } else if (type === 'behavior_vice') {
        this.form.behaviorForm.list[ind].reOp = this.handleRuleSwitchUtil(behaviorForm.list[ind].reOp)
      }
    },
    handleRuleSwitchUtil(val) {
      return val === 'and' ? 'or' : 'and'
    },
    /**
     * @description 删除一行规则
     * @param {String} type basics_main: 删除一行基础属性一级规则；basics_vice: 删除一行基础属性二级规则、如果此二级规则只剩一个则自动升级为一级。（behavior_main、behavior_vice行为属性同上）
     * @param {Number} ind  一级规则下标
     * @param {Number} i  二级规则下标
     */
    handleDeleteRule(type, ind, i) {
      const { basicsForm, behaviorForm } = this.form
      if (type === 'basics_main') {
        this.form.basicsForm.list.splice(ind, 1)
      } else if (type === 'basics_vice') {
        if (basicsForm.list[ind].list.length > 2) {
          this.form.basicsForm.list[ind].list.splice(i, 1)
        } else {
          this.$set(this.form.basicsForm.list, ind, basicsForm.list[ind].list[1 - i])
        }
      } else if (type === 'behavior_main') {
        this.form.behaviorForm.list.splice(ind, 1)
      } else if (type === 'behavior_vice') {
        if (behaviorForm.list[ind].list.length > 2) {
          this.form.behaviorForm.list[ind].list.splice(i, 1)
        } else {
          this.$set(this.form.behaviorForm.list, ind, behaviorForm.list[ind].list[1 - i])
        }
      }
    },
    /**
     * @description 行为属性 添加筛选
     * @param {String} type behavior_main：一级规则添加筛选；behavior_vice：二级规则添加筛选
     * @param {Boolean} flag true 添加筛选 false删除筛选
     * @param {Number} ind 一级规则下标
     * @param {Number} i 二级规则下标
     * @param {Number} index 额外筛选规则下标
     */
    handleAddBehaviorScreen(type, flag, ind, i, index) {
      const { form: { behaviorForm }} = this
      if (type === 'behavior_main') {
        if (flag) {
          const { rules } = behaviorForm.list[ind]
          let initVals = {}
          if (rules.length) {
            const { value, dictList, ops, dataType } = rules[0]
            initVals = {
              ops,
              dictList,
              dataType,
              id: value,
              value: dictList?.[0]?.value || '',
              opCode: ops?.[0]?.value || ''
            }
          }
          this.form.behaviorForm.list[ind].props = behaviorForm.list[ind].props.concat({ ...cloneDeep(init_behavior_screen_form), ...initVals })
        } else {
          this.form.behaviorForm.list[ind].props.splice(index, 1)
        }
      } else if (type === 'behavior_vice') {
        if (flag) {
          const { rules } = behaviorForm.list[ind].list[i]
          let initVals = {}
          if (rules.length) {
            const { value, dictList, ops, dataType } = rules[0]
            initVals = {
              ops,
              dictList,
              dataType,
              id: value,
              value: dictList?.[0]?.value || '',
              opCode: ops?.[0]?.value || ''
            }
          }
          this.form.behaviorForm.list[ind].list[i].props = behaviorForm.list[ind].list[i].props.concat({ ...cloneDeep(init_behavior_screen_form), ...initVals })
        } else {
          this.form.behaviorForm.list[ind].list[i].props.splice(index, 1)
        }
      }
    },
    /**
     * @description 行为属性 筛选所选的属性后要动态改变相应的规则等
     * @param {string} type screen_main 一级筛选规则；screen_vice 二级筛选规则
     * @param {number} val 当前属性值
     * @param {number} ind 一级规则下标
     * @param {number} i 二级规则下标
     * @param {number} index 筛选规则下标
     */
    handleBehaviorScreenChange(type, val, ind, i, index) {
      const { form: { behaviorForm }} = this
      if (type === 'screen_main') {
        const { rules } = behaviorForm.list[ind]
        const selectItem = rules.filter(v => v.value === val)[0]
        const { dataType, ops, dictList } = selectItem
        this.$set(this.form.behaviorForm.list[ind].props, index, { ...behaviorForm.list[ind].props[index], dataType, ops, dictList, opCode: ops?.[0]?.value || '', value: null })
      } else if (type === 'screen_vice') {
        const { rules } = behaviorForm.list[ind].list[i]
        const selectItem = rules.filter(v => v.value === val)[0]
        const { dataType, ops, dictList } = selectItem
        this.$set(this.form.behaviorForm.list[ind].list[i].props, index, { ...behaviorForm.list[ind].list[i].props[index], dataType, ops, dictList, opCode: ops?.[0]?.value || '', value: null })
      }
    },
    onFormSubmit() {
      this.$refs.formRef.validate((res) => {
        if (res) {
          const {
            form: { groupName, bizId, groupTreeId, desc, refreshWay, reOp, basicsForm, behaviorForm },
            $route: { query: { id, type }}
          } = this
          const basicsInfoFrom = { groupName, bizId, groupTreeId, desc, refreshWay, cid: uid, cname: uname }
          const rules = { reOp }
          // 基础属性规则数据组装
          if (basicsForm.list.length) {
            const userProps = basicsForm.list.map(v => {
              // eslint-disable-next-line no-prototype-builtins
              if (v.hasOwnProperty('list')) {
                return {
                  reOp: v.reOp,
                  props: v.list.map(val => this.handleBasicsForm(val))
                }
              } else {
                return {
                  reOp: 'and',
                  props: [this.handleBasicsForm(v)]
                }
              }
            })
            rules.userProps = {
              reOp: basicsForm.list.length <= 1 ? 'and' : basicsForm.reOp,
              userProps
            }
          }
          // 行为属性规则数据组装
          if (behaviorForm.list.length) {
            const events = behaviorForm.list.map(v => {
              // eslint-disable-next-line no-prototype-builtins
              if (v.hasOwnProperty('list')) {
                return {
                  reOp: v.reOp,
                  events: v.list.map(val => this.handleBehaviorForm(val))
                }
              } else {
                return {
                  reOp: 'and',
                  events: [this.handleBehaviorForm(v)]
                }
              }
            })
            rules.events = {
              reOp: behaviorForm.list.length <= 1 ? 'and' : behaviorForm.reOp,
              events
            }
          }
          console.log('rules', rules)
          // return
          if (type === 'edit') {
            editUserGroup({ desc, refreshWay, id, uid, uname, rules: JSON.stringify(rules) }).then(() => {
              this.$message.success('编辑分群成功~')
              this.$router.push({ path: '/intelligent-marketing/user-group' })
            })
          } else {
            addUserGroup({ ...basicsInfoFrom, rules: JSON.stringify(rules) }).then(() => {
              this.$message.success('新增分群成功~')
              this.$router.push({ path: '/intelligent-marketing/user-group' })
            })
          }
        }
      })
    },
    // 组装基础属性数据
    handleBasicsForm(values) {
      const { id, dataType, dictList, opCode, value, value2 } = values
      const { propsName, propsEname } = this.handleFindOps(id, this.userPropData)
      const obj = { id: id.split('-')[1], propsName, propsEname, dataType, opCode, value: {}}
      const resetValue = this.handleCommonForm({ dataType, dictList, opCode, value, value2 })
      return { ...obj, value: resetValue }
    },
    // 组装行为属性数据
    handleBehaviorForm(values) {
      const { triggerTimeType, dateTimeRangeValue, actionType, id, rules, eventCountopCode, eventCountopValue, props } = values
      const { name, ename } = this.handleFindOps(id, this.eventData)
      const obj = { triggerTimeType, actionType, id: id.split('-')[1], eventName: name, eventEname: ename, reOp: 'and', eventCountProp: { opCode: eventCountopCode, value: eventCountopValue }}
      if (triggerTimeType === 'RANGE') {
        obj.dateTimeRangeValue = {
          beginTime: moment(dateTimeRangeValue[0]).startOf('days').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(dateTimeRangeValue[1]).endOf('days').format('YYYY-MM-DD HH:mm:ss')
        }
      }
      if (props.length) {
        // obj.opCode = 'and'
        obj.props = props.map(values => {
          const { id, dataType, dictList, opCode, value, value2 } = values
          const { propsName, propsEname, propsType } = rules.filter(v => v.value === id)[0]
          const objValue = { id, propsName, propsEname, propsType, dataType, opCode }
          const resetValue = this.handleCommonForm({ dataType, dictList, opCode, value, value2 })
          return { ...objValue, value: resetValue }
        })
      }
      return obj
    },
    // 基础属性规则与行为属性的筛选规则一致，可共用对value值的处理
    handleCommonForm(values) {
      const { dataType, dictList, opCode, value, value2 } = values
      let valueObj = { }
      if (dataType === 'STRING' || dataType === 'LIST') {
        const valueObjTemp = { val: [], keys: [], dictCode: '' }
        value.forEach(v => {
          const val = dictList.filter(val => val.value === v)[0]
          valueObjTemp.val.push(val.val)
          valueObjTemp.keys.push(val.key)
          valueObjTemp.dictCode = valueObjTemp.dictCode || val.dictCode
        })
        valueObj = valueObjTemp
      } else if (dataType === 'BOOL') {
        valueObj.key = value
        valueObj.val = value === '0' ? '否' : '是'
      } else if (dataType === 'NUMBER') {
        if (opCode === 'NUM_RANGE') { // 区间为两个值
          valueObj.beginNum = value + ''
          valueObj.endNum = value2 + ''
        } else {
          valueObj.val = value + ''
        }
      } else if (dataType === 'DATETIME') {
        if (opCode === 'DATETIME_RANGE') {
          valueObj.beginTime = moment(value[0]).startOf('days').format('YYYY-MM-DD HH:mm:ss')
          valueObj.endTime = moment(value[1]).endOf('days').format('YYYY-MM-DD HH:mm:ss')
        } else {
          valueObj.days = value + ''
        }
      }
      return valueObj
    },
    /**
     * @description 用户属性字典下拉筛选
     * @param {string} query 筛选关键字
     * @param {string} type mian: 一级规则 vice: 二级规则
     * @param {string} id 对应的用户属性id
     * @param {number} ind 当前一级规则用户属性规则下标
     * @param {number} i 当前二级规则用户属性规则下标
     */
    handleBasicsDictListSearch: debounce(async function(query, type, id, ind, i, dictListCache = []) {
      const { result } = await listDictOfUserProps({ propId: id, val: query, limit: 100 })
      // 把缓存的也带上，因为如果新的options没有之前选的值，保存会有问题。。
      const allDictList = uniqWith([...transferData4(result), ...dictListCache], isEqual)
      if (type === 'main') {
        this.$set(this.form.basicsForm.list, ind, { ...this.form.basicsForm.list[ind], dictList: allDictList })
      } else {
        this.$set(this.form.basicsForm.list[ind].list, i, { ...this.form.basicsForm.list[ind].list[i], dictList: allDictList })
      }
    }, 300),
    /**
     * @description 行为属性筛选规则的事件筛选
     * @param {string} type main: 一级 vice: 二级
     * @param {string} query 搜索关键字
     * @param {string} id 对应的行为属性id
     * @param {number} ind 当前一级行为属性规则下标
     * @param {number} index 当前行为属性筛选规则的下标
     * @param {number} i 当前二级行为属性规则下标
     */
    handleBehaviorDictListSearch: debounce(async function(type, query, id, ind, index, i) {
      if (query === '') return
      const { result } = await listDictOfEventProps({ propId: id, val: query, limit: 150 })
      const allDictList = transferData4(result)
      if (type === 'main') {
        this.$set(this.form.behaviorForm.list[ind].props, index, { ...this.form.behaviorForm.list[ind].props[index], dictList: allDictList })
      } else {
        this.$set(this.form.behaviorForm.list[ind].list[i].props, index, { ...this.form.behaviorForm.list[ind].list[i].props[index], dictList: allDictList })
      }
    }, 300),
    handleBackPage() {
      this.$router.push({ path: '/intelligent-marketing/user-group' })
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-box {
  display: flex;
  position: relative;
  .rule-switch {
    left: 0;
    top: 0;
    bottom: 0;
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
    &>span {
      position: relative;
      display: block;
      top: 50%;
      left: 0;
      right: 0;
      width: auto;
      min-width: 25px;
      height: 25px;
      transform: translateY(-50%);
      border-radius: 3px;
      background: #e8f4ff;
      border-color: #a3d3ff;
      color: #1890ff;
      font-size: 12px;
      font-weight: 700;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
      user-select: none
    }
    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      overflow: hidden;
      background: #e8f4ff;
    }
  }
  &-right {
    flex: 1;
    .form-box {
      display: flex;
      justify-content: space-between;
      .form-item-wrap {
        flex: 1;
      }
      .form-item-bar {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
        .form-item-box {
          display: flex;
          flex: 1;
          justify-content: flex-start;
          flex-wrap: wrap;
          >div {
            margin-right: 5px;
          }
        }
        .form-item-action-box {
          text-align: right;
          width: 120px;
          ::v-deep .el-button {
            margin-left: 0px;
          }
        }
      }
      .behavior-form-item-bar {
        margin-bottom: 5px;
      }
      .extra-screen-box {
        display: flex;
        justify-content: flex-start;
        .extra-screen-left {
          width: 150px;
          margin-right: 10px;
          padding-right: 8px;
          text-align: right;
        }
        .extra-screen-content {
          display: flex;
          justify-content: flex-start;
          border-left: 2px solid #a3d3ff;
          padding-left: 20px;
          &-left {
            width: 30px;
            border: 1px solid #d3dce6 ;
            border-right: none;
            position: relative;
            margin-top: 20px;
            margin-bottom: 20px;
            >button {
              position: absolute;
              left: 0;
              top: 50%;
              margin-left: -15px;
              margin-top: -15px;
            }
          }
          &-item-bar {
            margin: 5px 0;
            display: flex;
            >div {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  .collapse-item-title-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>.el-button {
      margin-right: 10px;
    }
  }
}
</style>
