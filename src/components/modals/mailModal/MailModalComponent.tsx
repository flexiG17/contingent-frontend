import React, {useState} from "react";
import styles from './mailModal.module.scss'
import Select from 'react-select';
import ModalWindow from "../../../shared/modal/ModalWindow";
import {
    Box,
    LinearProgress,
    ListItemButton,
    ListItemText,
    TextField,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import {lineStyleInTable, systemColor, textFieldStyle} from "../../../shared/theme/styles";
import {LetterTemplates} from "../../../utils/const";
import {Link} from "react-router-dom";
import {IconFile, IconMail, OutlineFileIcon} from "../../../assets/Icons";
import {Modal, notification} from "antd";
import {sendMessage} from "../../../actions/student";


const selectedMailsList: any[] = []
const MailModalComponent = ({open, setOpen, studentsList, selectedRowKeys}:
                                {
                                    open: boolean,
                                    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
                                    studentsList: any[],
                                    selectedRowKeys: React.Key[]
                                }) => {
    let options: any[] = []
    LetterTemplates.map((template) => {
        options.push({value: template.message, label: template.title})
    })
    const [openDialog, setOpenDialog] = useState(false)
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [template, setTemplate] = useState()
    const [filesToSend, setFilesToSend] = useState<any[]>([]);
    const [sender, setSender] = useState('Информационная система URFUCONTINGENT')
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api['success']({
            message: 'Рассылка успешно проведена',
        });
    };

    const handleTypeSelect = (e: any) => {
        setTemplate(e.value);
        setText(e.value)
    }
    const mailtoHref = `mailto:${studentsList.map(student => student.email)}?subject=${subject}&body`

    studentsList.map((user) => {
        selectedRowKeys.map((id) => {
            if (user.id === id)
                selectedMailsList.push(user.first_student_email)
        })
    })

    const handleSendMail = () => {
        const dataToSave = new FormData()

        setLoadingRequest(true)
        setOpenDialog(false)
        const arrayToSave = selectedMailsList.filter((value, index, array) => {
            return array.indexOf(value) === index;
        })
        arrayToSave.map(address => {
            dataToSave.append('to', address)
        })
        dataToSave.append('from', sender)
        dataToSave.append('subject', subject)
        dataToSave.append('text', text)
        if (filesToSend)
            Object.values(filesToSend).map(file => {
                dataToSave.append('files', file)
            })
        sendMessage(dataToSave)
            .then(() => {
                setLoadingRequest(false)
                openNotificationWithIcon()
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            })
    }

    return (
        <ModalWindow open={open} setOpen={setOpen}>
            {contextHolder}
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                <div className={styles.container_position}>
                    <div className={styles.title_message_container}>Новое письмо</div>
                    <div className={styles.input_position_message}>
                        <TextField label="От кого" variant="outlined" color="warning" type="text"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                   value={sender} margin='normal'
                                   sx={{width: '400px'}}
                                   onChange={e => setSender(e.target.value)}
                                   size="small"
                        />
                        <div className={styles.template_in_row_with_icon}>
                            <Box
                                sx={{
                                    bgcolor: '#FFAA2D',
                                    borderRadius: '5px',
                                    maxHeight: 170,
                                    minWidth: 300,
                                    marginTop: "8px"
                                }}
                            >

                                <ListItemButton
                                    alignItems="flex-start"
                                    sx={{
                                        px: 1,
                                        pl: -10,
                                        pb: 2.5,
                                        '&:hover, &:focus': {'& svg': {opacity: 0}},
                                        height: '40px',
                                    }}
                                >
                                    <ListItemText
                                        primary={`Список почт при рассылке (${selectedRowKeys.length})`}
                                        primaryTypographyProps={textFieldStyle}
                                        sx={{my: 0, mt: 0.3}}
                                    />
                                </ListItemButton>
                            </Box>
                            {/*<Tooltip title="Скопировать список почт">
                                <IconMail
                                    className={styles.icon}
                                    onClick={() => {
                                        const arrayStudentEmails = studentsList
                                            .filter((object: any) => object.email !== null && object.email !== '')
                                            .map(object => object.email)
                                            .join(';')
                                        navigator.clipboard.writeText(arrayStudentEmails)
                                    }}/>
                            </Tooltip>*/}
                        </div>
                        <div className={styles.template_in_row_with_icon}>
                            <Select className={styles.message_type} placeholder="Шаблоны письма"
                                    options={options}
                                    onChange={handleTypeSelect}
                                    value={options.filter(function (option) {
                                        return option.value === template;
                                    })}/>
                            {/*<Tooltip title="Скопировать шаблон">
                                <IconFile
                                    style={{fill:'#000'}}
                                    className={styles.icon}
                                    onClick={() => {
                                        navigator.clipboard.writeText(text === undefined ? 'Ничего не скопировано' : text)
                                    }}/>
                            </Tooltip>*/}
                        </div>
                        <TextField label="Тема письма" variant="outlined" color="warning" type="text"
                                   inputProps={textFieldStyle} value={subject}
                                   onChange={e => setSubject(e.target.value)}
                                   margin='normal' InputLabelProps={textFieldStyle}
                                   size="small" sx={{width: "300px", marginTop: "25px"}}
                        />
                    </div>
                    <a className='send_with_other_mail' href={mailtoHref}>Отправить с другой почты</a>
                    <TextField
                        className={styles.input_message_sms}
                        label="Текст письма"
                        focused
                        multiline value={text} onChange={e => setText(e.target.value)}
                        rows={8}
                        variant="outlined"
                        sx={{
                            width: "800px",
                            marginTop: "15px",
                            marginBottom: "25px",
                            marginRight: "auto",
                            marginLeft: "auto"
                        }}
                        inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                        color="warning"
                    />
                    <label htmlFor="input_students" className={styles.file_input_message}>
                        {filesToSend === null ? 'Выбрать файл' : `Добавлено ${filesToSend.length} файла`}
                        <input type="file" name='input_students' id='input_students' hidden multiple
                               onChange={e => {
                                   // @ts-ignore
                                   setFilesToSend(e.target.files);
                               }}/>
                        <IconFile width={15} style={{textAlign: 'center'}}/>
                    </label>

                    {loadingRequest
                        ?
                        <ThemeProvider theme={systemColor}>
                            <LinearProgress color="primary"
                                            sx={{
                                                width: '200px',
                                                height: '30px',
                                                mt: "25px",
                                                mb: "10px",
                                                borderRadius: '7px'
                                            }}/>
                        </ThemeProvider>
                        :
                        <button className={styles.send_message} onClick={() => setOpenDialog(true)}>
                            Отправить сообщение
                        </button>}
                </div>
            </div>

            <Modal
                style={{marginTop: '300px'}}
                title="Рассылка по почте" open={openDialog} onOk={handleSendMail} onCancel={() => setOpenDialog(false)}>
                Вы уверены, что хотите отправить электронные письма?
            </Modal>
        </ModalWindow>
    )
}

export default MailModalComponent