import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppThunk } from '../../redux/store'
import log from 'electron-log'

export type TSelect = {
  label: string
  value: string
}

export type TProfileState = {
  locations: TSelect[]
  languages: TSelect[]
  loading: boolean
}

const initialState: TProfileState = {
  locations: [],
  languages: [
    { value: 'af', label: 'Afrikaans' },
    { value: 'sq', label: 'Albanian' },
    { value: 'an', label: 'Aragonese' },
    { value: 'ar', label: 'Arabic (Standard)' },
    { value: 'ar-dz', label: 'Arabic (Algeria)' },
    { value: 'ar-bh', label: 'Arabic (Bahrain)' },
    { value: 'ar-eg', label: 'Arabic (Egypt)' },
    { value: 'ar-iq', label: 'Arabic (Iraq)' },
    { value: 'ar-jo', label: 'Arabic (Jordan)' },
    { value: 'ar-kw', label: 'Arabic (Kuwait)' },
    { value: 'ar-lb', label: 'Arabic (Lebanon)' },
    { value: 'ar-ly', label: 'Arabic (Libya)' },
    { value: 'ar-ma', label: 'Arabic (Morocco)' },
    { value: 'ar-om', label: 'Arabic (Oman)' },
    { value: 'ar-qa', label: 'Arabic (Qatar)' },
    { value: 'ar-sa', label: 'Arabic (Saudi Arabia)' },
    { value: 'ar-sy', label: 'Arabic (Syria)' },
    { value: 'ar-tn', label: 'Arabic (Tunisia)' },
    { value: 'ar-ae', label: 'Arabic (U.A.E.)' },
    { value: 'ar-ye', label: 'Arabic (Yemen)' },
    { value: 'hy', label: 'Armenian' },
    { value: 'as', label: 'Assamese' },
    { value: 'ast', label: 'Asturian' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'eu', label: 'Basque' },
    { value: 'bg', label: 'Bulgarian' },
    { value: 'be', label: 'Belarusian' },
    { value: 'bn', label: 'Bengali' },
    { value: 'bs', label: 'Bosnian' },
    { value: 'br', label: 'Breton' },
    { value: 'my', label: 'Burmese' },
    { value: 'ca', label: 'Catalan' },
    { value: 'ch', label: 'Chamorro' },
    { value: 'ce', label: 'Chechen' },
    { value: 'zh', label: 'Chinese' },
    { value: 'zh-hk', label: 'Chinese (Hong Kong)' },
    { value: 'zh-cn', label: 'Chinese (PRC)' },
    { value: 'zh-sg', label: 'Chinese (Singapore)' },
    { value: 'zh-tw', label: 'Chinese (Taiwan)' },
    { value: 'cv', label: 'Chuvash' },
    { value: 'co', label: 'Corsican' },
    { value: 'cr', label: 'Cree' },
    { value: 'hr', label: 'Croatian' },
    { value: 'cs', label: 'Czech' },
    { value: 'da', label: 'Danish' },
    { value: 'nl', label: 'Dutch (Standard)' },
    { value: 'nl-be', label: 'Dutch (Belgian)' },
    { value: 'en', label: 'English' },
    { value: 'en-au', label: 'English (Australia)' },
    { value: 'en-bz', label: 'English (Belize)' },
    { value: 'en-ca', label: 'English (Canada)' },
    { value: 'en-ie', label: 'English (Ireland)' },
    { value: 'en-jm', label: 'English (Jamaica)' },
    { value: 'en-nz', label: 'English (New Zealand)' },
    { value: 'en-ph', label: 'English (Philippines)' },
    { value: 'en-za', label: 'English (South Africa)' },
    { value: 'en-tt', label: 'English (Trinidad & Tobago)' },
    { value: 'en-gb', label: 'English (United Kingdom)' },
    { value: 'en-us', label: 'English (United States)' },
    { value: 'en-zw', label: 'English (Zimbabwe)' },
    { value: 'eo', label: 'Esperanto' },
    { value: 'et', label: 'Estonian' },
    { value: 'fo', label: 'Faeroese' },
    { value: 'fa', label: 'Persian' },
    { value: 'fj', label: 'Fijian' },
    { value: 'fi', label: 'Finnish' },
    { value: 'fr', label: 'French (Standard)' },
    { value: 'fr-be', label: 'French (Belgium)' },
    { value: 'fr-ca', label: 'French (Canada)' },
    { value: 'fr-fr', label: 'French (France)' },
    { value: 'fr-lu', label: 'French (Luxembourg)' },
    { value: 'fr-mc', label: 'French (Monaco)' },
    { value: 'fr-ch', label: 'French (Switzerland)' },
    { value: 'fy', label: 'Frisian' },
    { value: 'fur', label: 'Friulian' },
    { value: 'gd', label: 'Scots Gaelic' },
    { value: 'gd-ie', label: 'Gaelic (Irish)' },
    { value: 'gl', label: 'Galacian' },
    { value: 'ka', label: 'Georgian' },
    { value: 'de', label: 'German (Standard)' },
    { value: 'de-at', label: 'German (Austria)' },
    { value: 'de-de', label: 'German (Germany)' },
    { value: 'de-li', label: 'German (Liechtenstein)' },
    { value: 'de-lu', label: 'German (Luxembourg)' },
    { value: 'de-ch', label: 'German (Switzerland)' },
    { value: 'el', label: 'Greek' },
    { value: 'gu', label: 'Gujurati' },
    { value: 'ht', label: 'Haitian' },
    { value: 'he', label: 'Hebrew' },
    { value: 'hi', label: 'Hindi' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'is', label: 'Icelandic' },
    { value: 'id', label: 'Indonesian' },
    { value: 'iu', label: 'Inuktitut' },
    { value: 'ga', label: 'Irish' },
    { value: 'it', label: 'Italian (Standard)' },
    { value: 'it-ch', label: 'Italian (Switzerland)' },
    { value: 'ja', label: 'Japanese' },
    { value: 'kn', label: 'Kannada' },
    { value: 'ks', label: 'Kashmiri' },
    { value: 'kk', label: 'Kazakh' },
    { value: 'km', label: 'Khmer' },
    { value: 'ky', label: 'Kirghiz' },
    { value: 'tlh', label: 'Klingon' },
    { value: 'ko', label: 'Korean' },
    { value: 'ko-kp', label: 'Korean (North Korea)' },
    { value: 'ko-kr', label: 'Korean (South Korea)' },
    { value: 'la', label: 'Latin' },
    { value: 'lv', label: 'Latvian' },
    { value: 'lt', label: 'Lithuanian' },
    { value: 'lb', label: 'Luxembourgish' },
    { value: 'mk', label: 'FYRO Macedonian' },
    { value: 'ms', label: 'Malay' },
    { value: 'ml', label: 'Malayalam' },
    { value: 'mt', label: 'Maltese' },
    { value: 'mi', label: 'Maori' },
    { value: 'mr', label: 'Marathi' },
    { value: 'mo', label: 'Moldavian' },
    { value: 'nv', label: 'Navajo' },
    { value: 'ng', label: 'Ndonga' },
    { value: 'ne', label: 'Nepali' },
    { value: 'no', label: 'Norwegian' },
    { value: 'nb', label: 'Norwegian (Bokmal)' },
    { value: 'nn', label: 'Norwegian (Nynorsk)' },
    { value: 'oc', label: 'Occitan' },
    { value: 'or', label: 'Oriya' },
    { value: 'om', label: 'Oromo' },
    { value: 'fa-ir', label: 'Persian/Iran' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'pt-br', label: 'Portuguese (Brazil)' },
    { value: 'pa', label: 'Punjabi' },
    { value: 'pa-in', label: 'Punjabi (India)' },
    { value: 'pa-pk', label: 'Punjabi (Pakistan)' },
    { value: 'qu', label: 'Quechua' },
    { value: 'rm', label: 'Rhaeto-Romanic' },
    { value: 'ro', label: 'Romanian' },
    { value: 'ro-mo', label: 'Romanian (Moldavia)' },
    { value: 'ru', label: 'Russian' },
    { value: 'ru-mo', label: 'Russian (Moldavia)' },
    { value: 'sz', label: 'Sami (Lappish)' },
    { value: 'sg', label: 'Sango' },
    { value: 'sa', label: 'Sanskrit' },
    { value: 'sc', label: 'Sardinian' },
    { value: 'sd', label: 'Sindhi' },
    { value: 'si', label: 'Singhalese' },
    { value: 'sr', label: 'Serbian' },
    { value: 'sk', label: 'Slovak' },
    { value: 'sl', label: 'Slovenian' },
    { value: 'so', label: 'Somani' },
    { value: 'sb', label: 'Sorbian' },
    { value: 'es', label: 'Spanish' },
    { value: 'es-ar', label: 'Spanish (Argentina)' },
    { value: 'es-bo', label: 'Spanish (Bolivia)' },
    { value: 'es-cl', label: 'Spanish (Chile)' },
    { value: 'es-co', label: 'Spanish (Colombia)' },
    { value: 'es-cr', label: 'Spanish (Costa Rica)' },
    { value: 'es-do', label: 'Spanish (Dominican Republic)' },
    { value: 'es-ec', label: 'Spanish (Ecuador)' },
    { value: 'es-sv', label: 'Spanish (El Salvador)' },
    { value: 'es-gt', label: 'Spanish (Guatemala)' },
    { value: 'es-hn', label: 'Spanish (Honduras)' },
    { value: 'es-mx', label: 'Spanish (Mexico)' },
    { value: 'es-ni', label: 'Spanish (Nicaragua)' },
    { value: 'es-pa', label: 'Spanish (Panama)' },
    { value: 'es-py', label: 'Spanish (Paraguay)' },
    { value: 'es-pe', label: 'Spanish (Peru)' },
    { value: 'es-pr', label: 'Spanish (Puerto Rico)' },
    { value: 'es-es', label: 'Spanish (Spain)' },
    { value: 'es-uy', label: 'Spanish (Uruguay)' },
    { value: 'es-ve', label: 'Spanish (Venezuela)' },
    { value: 'sx', label: 'Sutu' },
    { value: 'sw', label: 'Swahili' },
    { value: 'sv', label: 'Swedish' },
    { value: 'sv-fi', label: 'Swedish (Finland)' },
    { value: 'sv-sv', label: 'Swedish (Sweden)' },
    { value: 'ta', label: 'Tamil' },
    { value: 'tt', label: 'Tatar' },
    { value: 'te', label: 'Teluga' },
    { value: 'th', label: 'Thai' },
    { value: 'tig', label: 'Tigre' },
    { value: 'ts', label: 'Tsonga' },
    { value: 'tn', label: 'Tswana' },
    { value: 'tr', label: 'Turkish' },
    { value: 'tk', label: 'Turkmen' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'hsb', label: 'Upper Sorbian' },
    { value: 'ur', label: 'Urdu' },
    { value: 've', label: 'Venda' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'vo', label: 'Volapuk' },
    { value: 'wa', label: 'Walloon' },
    { value: 'cy', label: 'Welsh' },
    { value: 'xh', label: 'Xhosa' },
    { value: 'ji', label: 'Yiddish' },
    { value: 'zu', label: 'Zulu' },
  ],
  loading: false,
}

export const pastelProfileSlice = createSlice({
  name: 'pastelProfile',
  initialState,
  reducers: {
    setLocations(state: TProfileState, action: PayloadAction<TSelect[]>) {
      state.locations = action.payload
      state.loading = false
    },
    locationFetchFailed(state: TProfileState) {
      state.loading = false
    },
    startedFetchingLocation(state: TProfileState) {
      state.loading = true
    },
  },
})

const {
  setLocations,
  locationFetchFailed,
  startedFetchingLocation,
} = pastelProfileSlice.actions

export const pastelProfileReducer = pastelProfileSlice.reducer

export function fetchLocations(suggested: string): AppThunk {
  return async dispatch => {
    try {
      dispatch(startedFetchingLocation())
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${suggested}&format=json`,
      )
      const temp = []
      for (const location of res.data) {
        temp.push({
          label: location.display_name,
          value: location.display_name,
        })
      }
      dispatch(setLocations(temp))
    } catch (err) {
      log.error('Failed to fetch locations', err.message)
      dispatch(locationFetchFailed())
    }
  }
}
