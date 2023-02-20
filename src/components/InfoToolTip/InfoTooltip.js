import React from "react";
import CloseD from '../../images/Union.svg'
import GooD from '../../images/UnionOk.svg'


function InfoToolTip ({isOpen, onClose}) {

  return (
    <div className={`popup popup_opacity ` + (isOpen.boolean ? ' popup_opened': '')}>
      <div className="popup__container">
        <div className="popup__forms">
          {isOpen.error ?
              <>
                <img src={CloseD} className="popup__image-error" alt='Картиника потверждающие неуспешное действие'></img>
                <h2 className="popup__title">
                  {isOpen.text}
                </h2>
              </>
              :
              <>
                <img src={GooD} className="popup__image-error" alt='Картиника потверждающие успешное действие'></img>
                <h2 className="popup__title">
                  {isOpen.text}
                </h2>
              </>
          }
          <button type="button" aria-label="Закрыть форму" className="popup__button-close" 
            onClick={onClose}>
          </button>    
        </div>
      </div>
    </div>
  )
}

export default InfoToolTip;