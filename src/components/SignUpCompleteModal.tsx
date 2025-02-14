import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/QuestionPage.module.css'
import 모달3 from '../assets/images/ModalImg3.png'


type ModalProps = {
  isOpen: boolean
  title: string
  message: string
  onSubmit?: () => void
  onClose: () => void
  isSecondModal?: boolean
}

const QuestionModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
}) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleHomepageRedirect = () => {
    navigate('/MainPage')
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.modalImageContainer}>
          <img
            src={모달3}
            alt='회원가입완'
            className={styles.modalImage}
          />
        </div>
        <div className={styles.modalButton} > 
          <button
            className={styles.confirmButton}
            onClick={handleHomepageRedirect}
            style={{width:'180px',backgroundColor: '#007bff', color: 'white', paddingBottom: '30px'}}
          >
            메인 페이지로
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionModal
