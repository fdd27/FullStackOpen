import PropTypes from 'prop-types'

const Notification = ({ msg, type }) => {
  if (!msg) return null
  return (
    <div className={`${type}`}>{msg}</div>
  )
}

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification