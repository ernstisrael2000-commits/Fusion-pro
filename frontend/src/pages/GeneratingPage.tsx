import FusionCoreAnimation from '../components/FusionCore/FusionCoreAnimation'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

export default function GeneratingPage({ navigate }: Props) {
  return (
    <FusionCoreAnimation
      onComplete={() => setTimeout(() => navigate('results'), 800)}
    />
  )
}
