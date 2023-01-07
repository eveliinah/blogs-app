import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? '#8E3B46' : '#326827',
    background: '#F3F6F6',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 25,
    marginBottom: 10,
  }

  return (
    <div style={style} className="notification">
      {notification.message}
    </div>
  )
}

export default Notification
