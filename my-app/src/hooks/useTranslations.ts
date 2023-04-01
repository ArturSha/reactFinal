import ru from '../resources/locales/ru.json'
import en from '../resources/locales/en.json'
import {  useAppSelector } from '../redux/store'

type LanguageType = string;
const translation:{[name in LanguageType]: typeof ru & typeof en} = {'ru-RU': ru,'en-EN':en}


export const useTranslation = () => {
const language = useAppSelector(state => state.authReducer.userLanguage )

return {
    t:translation[language]
}
}