/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-26 16:46:10
 * @LastEditors: ZhangYeLei
 * @LastEditTime: 2022-05-30 16:08:33
 */
export default {
  version: '5.0.2.3',
  title: '运营管理平台',
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
  dsn: 'https://9015d123080b4858bd27446cb749e4bb@sentry.meishubao.com/18'
}
