'use strict'

const axios = require('axios')
const Env = use('Env')

class AppController {
  async index({ request }){
    const params = request.all()

    const query = await axios({
      url: Env.get('RESOURCE_URL'),
      method: 'get',
      headers: {
        'Origin': Env.get('RESOURCE_ORIGIN'),
      },
      params: {
        item: params.item,
        slim: params.slim || true,
        exact: params.exact || false,
      },
    })

    return query.data
  }
}

module.exports = AppController
