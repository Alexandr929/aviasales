import AK from '../assets/logos/AK.avif'
import BT from '../assets/logos/BT.avif'
import DP from '../assets/logos/DP.avif'
import FV from '../assets/logos/FV.avif'
import S7 from '../assets/logos/S7.avif'
import U6 from '../assets/logos/U6.avif'
import UT from '../assets/logos/UT.avif'
import W6 from '../assets/logos/W6.avif'

const logos = {
  AK: AK,
  BT: BT,
  DP: DP,
  FV: FV,
  S7: S7,
  U6: U6,
  UT: UT,
  W6: W6,
}

export const getLocalLogos = (carrier: string) => {
  if (logos[carrier]) {
    return logos[carrier]
  }
  return `//pics.avs.io/99/36/${carrier}.png`
}
