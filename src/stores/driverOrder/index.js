import { observable, action } from 'mobx'
import {
  cancelStudentOrder,
  getDriverOrder,
} from 'src/api/order'

class OrderStore {
  @observable driverOrders = []
  @observable driverWechatId = ''
  @observable message = null
  @observable error = null


  setError(err) {
    self.error = err.message
    self.message = null
  }

  @action async cancelStudentOrder({ studentWechatId }) {
    self.error = null
    try {
      await cancelStudentOrder({ studentWechatId })
      const driverWechatId = self.driverWechatId
      try {
        await self.getDriverOrders({driverWechatId})
      } catch(err) {
        self.driverOrders = []
        self.error = err.message
      }
    } catch (err) {
      self.driverOrders = []
      self.error = err.message
    }
  }

  @action async getDriverOrders({ driverWechatId }) {
    self.driverWechatId = driverWechatId
    self.error = null
    try {
      let res = await getDriverOrder({ driverWechatId })
      self.driverOrders = res.data
    } catch (err) {
      self.driverOrders = []
      self.error = err.message
    }
  }


}

const self = new OrderStore()
export default self