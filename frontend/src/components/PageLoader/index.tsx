import { Loader } from 'components/Loader'

import './styles.scss'

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader-container">
      <Loader className="page-loader" />
    </div>
  )
}

export default PageLoader
