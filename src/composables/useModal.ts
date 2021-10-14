export default function () {
  const closeQDialogElementIfExist = () => {
    const elements = document.getElementsByClassName('q-dialog')
    if (elements.length < 1) return false
    const dialogELement = elements[0]
    dialogELement.parentNode?.removeChild(dialogELement)
    return true
  }

  return { closeQDialogElementIfExist }
}
