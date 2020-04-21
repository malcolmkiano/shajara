import React, { Component } from 'react'
import './premium.sass'

import { PremiumImage, PremiumIcon } from '../../images'
import { Button } from '../../components'

class Premium extends Component {
  render() {
    return (
      <div className="premium">
        <p>This is a <b>PREMIUM</b> <PremiumIcon className="crown" /> feature.</p>
        <PremiumImage aria-hidden={true} title="Premium image"/>
        <Button
          onClick={() => alert('"Premium" just means I haven\'t made this feature yet.')}>
          Upgrade Now!
        </Button>
      </div>
    )
  }
}

export default Premium
