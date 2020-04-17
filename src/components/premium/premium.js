import React, { Component } from 'react'
import './premium.sass'

import { PremiumImage, PremiumIcon } from '../../images'
import { Button } from '../../components'

export default class Premium extends Component {
  render() {
    return (
      <div className="premium">
        <p>This is a <b>PREMIUM</b> <PremiumIcon className="premium" /> feature.</p>
        <PremiumImage />
        <Button
          onClick={() => alert('"Premium" just means I haven\'t made this feature yet.')}>
          Upgrade Now!
        </Button>
      </div>
    )
  }
}
