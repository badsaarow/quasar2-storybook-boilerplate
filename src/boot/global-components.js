import { boot } from 'quasar/wrappers'
import * as Page from 'components/Page/Page'
import * as PageHeader from 'components/Page/PageHeader'
import * as PageHeaderBtnBack from 'components/Page/PageHeaderBtnBack'
import * as PageBody from 'components/Page/PageBody'

const globalComponents = {
  Page,
  PageHeader,
  PageHeaderBtnBack,
  PageBody,
}

export default boot(async ({ app }) => {
  for (const key in globalComponents) {
    app.component(key, globalComponents[key])
  }
})
