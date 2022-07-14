import React, {useState} from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {ReactComponent as UploadIcon} from "../../../../common/assets/img/icons/svg/40/icon-upload-40.svg";
import {ReactComponent as DownloadIcon} from "../../../../common/assets/img/icons/svg/24/icon-download-24.svg";
import {ReactComponent as TrashIcon} from "../../../../common/assets/img/icons/svg/24/icon-trash-24.svg";
import {ReactComponent as CloseIcon} from "../../../../common/assets/img/icons/svg/24/icon-close-24.svg";
import {ReactComponent as FileAlertIcon} from "../../../../common/assets/img/icons/svg/40/icon-file-alert-40.svg";
import {ReactComponent as JPGIcon} from "../../../../common/assets/img/icons/svg/40/icon-file-40.svg";
import {ReactComponent as PNGIcon} from "../../../../common/assets/img/icons/svg/40/icon-file-40.svg";
import {ReactComponent as DOCIcon} from "../../../../common/assets/img/icons/svg/40/icon-file-40.svg";
import {ReactComponent as PDFIcon} from "../../../../common/assets/img/icons/svg/40/icon-file-40.svg";
import {addMessage, createMessage} from "../Message/Message";
import {MessageType} from "../../../services/consts/common";


export const FileType = {
  IMAGE: `image`,
  DOCUMENT: `document`,
  ARCHIVE: `archive`,
};

export const FileFormat = {
  JPG: `.jp`, // .jpg/.jpeg
  PNG: `.png`,
  DOC: `.doc`,
  XLS: `.xls`,
  PDF: `.pdf`,
  RAR: `.rar`,
  ZIP: `.zip`,
  TXT: `.txt`,
};

const DEFAULT_SERVER_IMAGE_SIZE = 5;
const DEFAULT_SERVER_DOC_SIZE = 10;

/**
fileType - oneOf([FileType.IMAGE, FileType.DOCUMENT, FileType.ARCHIVE]),
url - url файла на сервере,
fieldFileName - имя переменной, в которой хранится url файла,
notUploadedText - текст, когда файл не загружен,
fileFormatText - текст форматов файлов,
maxSize - максимальный размер файла,
uploadFileAction -  экшн загрузки файла, прокидывает formData, setProgress для обновления состояния загрузки с сервера
  uploadFileAction={(formData, setProgress) => dispatch(uploadCompanyFile(company.id, formData, setProgress))}
abortUploadFileAction - экшн прерывания загрузки файла на сервер
downloadFileAction - экшн скачивания файла
deleteFileAction -  экшн удаления файла
  deleteFileAction={() => dispatch(updateCompany(company.id, {regulations: null}))}
 */

const UploadFileCard = (props) => {
  const {
    fileType,
    url,
    fieldFileName,
    notUploadedText,
    fileFormatText,
    maxSize,
    uploadFileAction,
    abortUploadFileAction,
    downloadFileAction,
    deleteFileAction,
  } = props;

  const [isFileLoading, setIsFileLoading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState(null);
  const [notAllowFile, setNotAllowFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const renderFileTypeIcon = (url) => {
    if(url.includes(FileFormat.JPG, -1)) return <JPGIcon/>
    if(url.includes(FileFormat.PNG, -1)) return <PNGIcon/>
    if(url.includes(FileFormat.DOC, -1)) return <DOCIcon/>
    if(url.includes(FileFormat.PDF, -1)) return <PDFIcon/>
    if(url.includes(FileFormat.XLS, -1)) return <FileAlertIcon/>
    if(url.includes(FileFormat.RAR, -1)) return <FileAlertIcon/>
    if(url.includes(FileFormat.ZIP, -1)) return <FileAlertIcon/>
    if(url.includes(FileFormat.TXT, -1)) return <FileAlertIcon/>
  };

  const acceptMIMEType = (fileType) => {
    switch (fileType) {
      case FileType.IMAGE:
        return `image/jpeg, image/pjpeg, image/png`
      case FileType.DOCUMENT:
        return `application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`
      case FileType.ARCHIVE:
        return `application/zip, ,multipart/x-zip, application/gzip, application/x-7z-compressed,
         application/x-rar-compressed, application/vnd.rar`
    }
  };

  const renderFileFormatText = (fileType, fileFormatText, maxSize) => {
    switch (fileType) {
      case FileType.IMAGE:
        return `${fileFormatText || `jpg, png`} не более 
        ${maxSize < DEFAULT_SERVER_IMAGE_SIZE ? maxSize : DEFAULT_SERVER_IMAGE_SIZE}Mb`
      case FileType.DOCUMENT:
        return `${fileFormatText || `doc, pdf`} не более
         ${maxSize < DEFAULT_SERVER_DOC_SIZE ? maxSize : DEFAULT_SERVER_DOC_SIZE}Mb`
      case FileType.ARCHIVE:
        return `${fileFormatText || `rar, zip`} не более 
        ${maxSize < DEFAULT_SERVER_DOC_SIZE ? maxSize : DEFAULT_SERVER_DOC_SIZE}Mb`
    }
  };

  const maxFileSize = (fileType) => {
    switch (fileType) {
      case FileType.IMAGE:
          return DEFAULT_SERVER_IMAGE_SIZE * 1024 * 1024;
      case FileType.DOCUMENT:
      case FileType.ARCHIVE:
        return DEFAULT_SERVER_DOC_SIZE * 1024 * 1024
    }
  };

  const uploadFile = (fileName, acceptedFile, rejectionFile) => {
    if(rejectionFile) {
      setNotAllowFile(rejectionFile);
      const errorText = (size) => `Размер файла должен быть не более ${size / 1024 / 1024}Mb`;
      const allowSize = maxFileSize(fileType)
      if (rejectionFile.size > allowSize) addMessage(createMessage(MessageType.ERROR,`Ошибка`, errorText(allowSize)));
      return;
    }

    if(notAllowFile) setNotAllowFile(null);
    setUploadFileName(acceptedFile.name);

    const formData = new FormData();
    formData.append(fileName, acceptedFile);
    setIsFileLoading(true);
    uploadFileAction(formData, setProgress).then(() => {
      setIsFileLoading(false);
      addMessage(createMessage(MessageType.SUCCESS,`Успешно`, `Файл загружен`))
    }).catch(err => {
      setIsFileLoading(false);
      addMessage(createMessage(MessageType.ERROR,`Ошибка`, `Ошибка загрузки. Попробуйте еще раз.`))
    })
  };

  const documentCardClasses = cn({
    "document-card": true,
    "red": notAllowFile,
  })

  return (
    <div className={documentCardClasses}>
      <div className="document-card__body">
        <Dropzone accept={acceptMIMEType(fileType)}
                  minSize={1}
                  maxSize={maxFileSize(fileType)}
                  onDrop={(acceptedFiles, fileRejections) => (
                    uploadFile(fieldFileName, acceptedFiles[0], fileRejections[0]?.file)
                  )}
        >
          {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps({className: 'document-card__dropzone'})}>
              <input {...getInputProps()}/>
              <span className="document-card__desc-icon link-option__icon">
                <UploadIcon/>
              </span>
              <span className="document-card__desc-text link-option__text">
                {isDragActive && `Поместите файл сюда...`}
                {!isDragActive && notUploadedText && `${notUploadedText} (${renderFileFormatText(fileType, fileFormatText, maxSize)})`}
                {!isDragActive && !notUploadedText && (
                  <>Перетащите файл в это поле или <span>выберите файл</span></>
                )}
              </span>
            </div>
          )}
        </Dropzone>
      </div>

      {(url.includes(`/media/`) || isFileLoading || notAllowFile) &&
        <footer className="document-card__footer">
          <div className="document-card__footer-file">
            <span className="document-card__desc-icon">
              {renderFileTypeIcon(notAllowFile?.name || url)}
            </span>
            {!isFileLoading && (
              <div className="document-card__caption">
                {!notAllowFile && (<>{url.match(/([\w,\s-]+)\.[A-Za-z]{3,4}/)[0]} <br/> <span>128Kb</span></>)}
                {notAllowFile && (<>{notAllowFile.name} <br/> <span>Неверный формат {Math.ceil(notAllowFile.size / 1024)}Kb</span></>)}
              </div>
            )}
          </div>
          {isFileLoading && (
            <div className="document-card__progress-bar progress-bar">
              <span className="progress-bar__caption">{uploadFileName}</span>
              <span className="progress-bar__percent">({`${progress}%`})</span>
              <div className="progress-bar__status"/>
            </div>
          )}
          <div className="document-card__footer-buttons">
            {!isFileLoading && !notAllowFile && (
              <>
                <span className="document-card__desc-icon link-option__icon" onClick={downloadFileAction}>
                  <DownloadIcon/>
                </span>
                <span className="document-card__desc-icon link-option__icon" onClick={deleteFileAction}>
                  <TrashIcon/>
                </span>
              </>
            )}
            {isFileLoading && (
              <span className="document-card__desc-icon link-option__icon" onClick={abortUploadFileAction}>
                <CloseIcon/>
              </span>
            )}
          </div>
        </footer>
      }
    </div>
  )
};

UploadFileCard.propTypes = {
  fileType: PropTypes.oneOf([FileType.IMAGE, FileType.DOCUMENT, FileType.ARCHIVE]).isRequired,
  url: PropTypes.string.isRequired,
  fieldFileName: PropTypes.string.isRequired,
  notUploadedText: PropTypes.string,
  fileFormatText: PropTypes.string,
  maxSize: PropTypes.number,
  uploadFileAction: PropTypes.func.isRequired,
  abortUploadFileAction: PropTypes.func.isRequired,
  downloadFileAction: PropTypes.func.isRequired,
  deleteFileAction: PropTypes.func.isRequired,
};

export default UploadFileCard;
