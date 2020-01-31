class MessageManager {
  _messageInstance = null

  register(ref) {
    if (!this._messageInstance || this._messageInstance._id !== ref._id) {
      this._messageInstance = ref
    }
  }
  unregister(ref) {
    if (!!this._messageInstance && this._messageInstance._id === ref._id) {
      this._messageInstance = null
    }
  }
  getMessageInstance() {
    return this._messageInstance
  }
}

export default new MessageManager()
