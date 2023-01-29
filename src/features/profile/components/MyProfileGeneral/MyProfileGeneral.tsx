import React, { useState, useEffect, useCallback } from 'react'
import { Convert } from 'easy-currencies'
import getSymbolFromCurrency from 'currency-symbol-map'

import StarRate from '../StarRate'
import Categories from '../Categories'
import ProfileGeneralRow from '../ProfileGeneralRow'
import Tooltip from 'common/components/Tooltip/Tooltip'

import NSFWControls from './NSFWControls'
import { formatPrice } from 'common/utils/format'
import { useCurrencyName } from 'common/hooks/appInfo'
import Select, { TOption } from 'common/components/Select'
import { DEFAULT_LANGUAGE } from 'common/constants/languages'
import { useSuggestLocations } from 'api/locations'
import { TGetResponse } from 'api/walletNode/userData'
import { translate } from 'features/app/translations'
import LANGUAGES from '_locales/index.json'

export type TCurrency =
  | 'EUR'
  | 'CNY'
  | 'JPY'
  | 'GBP'
  | 'AUD'
  | 'NGN'
  | 'IDR'
  | 'USD'

export type TProfileGeneral = {
  editMode: boolean
  nativeCurrency: TCurrency
  user?: TGetResponse
  userData?: TGetResponse
  setUserData: (data?: TGetResponse) => void
}

const generateLang = () => {
  const langFilter = LANGUAGES.filter(lang => lang.active)
  const langs = []
  for (const lang of langFilter) {
    langs.push({
      value: lang.code,
      label: lang.name,
    })
  }
  return langs.sort((a, b) => {
    const labelA = a.label.toUpperCase() // ignore upper and lowercase
    const labelB = b.label.toUpperCase() // ignore upper and lowercase
    if (labelA < labelB) {
      return -1
    }
    if (labelA > labelB) {
      return 1
    }
    return 0
  })
}

export default function ProfileGeneral({
  editMode,
  nativeCurrency,
  user,
  userData,
  setUserData,
}: TProfileGeneral): JSX.Element {
  let defaultLanguage = DEFAULT_LANGUAGE
  const languagesOption = generateLang()
  if (user?.primary_language) {
    defaultLanguage =
      languagesOption.find(l => l.value === user.primary_language) ||
      DEFAULT_LANGUAGE
  }
  const data = {
    location: user?.location || translate('none'),
    language: defaultLanguage.label,
    categories: user?.categories || [],
    reputation: 0,
    highestFeeReceived: { value: 0, comment: 0 },
    totalSalesAmount: { value: 0, comment: 0 },
    totalItemsSold: translate('totalNFTsSoldCopies', { copies: 0, total: 0 }),
    bio: user?.biography || translate('none'),
  }

  const price = 15
  const [categories, setCategories] = useState<Array<string>>(data.categories)
  const [bio, setBio] = useState<string>(data.bio)
  const [location, setLocation] = useState<TOption | null>(null)
  const [language, setLanguage] = useState<TOption | null>(defaultLanguage)
  const [currentPrice, setCurrentPrice] = useState(0)
  const currencyName = useCurrencyName()

  const [locationsQuery, setLocationsQuery] = useState('')
  const {
    data: locations = [],
    isLoading: isLoadingLocations,
  } = useSuggestLocations(locationsQuery, {
    enabled: locationsQuery.length > 0,
  })

  useEffect(() => {
    const getNativeCurrency = async (): Promise<void> => {
      if (!nativeCurrency) {
        return
      }

      const result = await Convert(price)
        .from('USD')
        .to(user?.native_currency || nativeCurrency)
      setCurrentPrice(result)
    }
    getNativeCurrency()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [nativeCurrency])

  const onBioChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBio(e.target.value)
      if (userData) {
        setUserData({
          ...userData,
          biography: e.target.value,
        })
      }
    },
    [userData],
  )

  const handleLocationChange = useCallback(
    (option: TOption | null) => {
      setLocation(option)
      if (userData) {
        setUserData({
          ...userData,
          location: option?.value,
        })
      }
    },
    [userData],
  )

  const handleLanguageChange = useCallback(
    (option: TOption | null) => {
      setLanguage(option)
      if (userData) {
        setUserData({
          ...userData,
          primary_language: option?.value,
        })
      }
    },
    [userData],
  )

  const handleCategoriesChange = useCallback(
    (option: string[]) => {
      setCategories(option)
      if (userData) {
        setUserData({
          ...userData,
          categories: option,
        })
      }
    },
    [userData],
  )

  const renderBioAndEditButton = () => (
    <div className='w-full mt-20 1200px:mb-0'>
      <div className='flex'>
        <div className='w-190px text-gray-71'>{translate('bio')}</div>
      </div>
      <div className='flex pt-3'>
        <div className='flex-grow text-gray-4a font-medium text-base leading-5'>
          {editMode ? (
            <div className='rounded bg-white py-6 px-4 shadow-4px h-216px'>
              <textarea
                className='w-full rounded outline-none h-full resize-none text-base text-gray-4a font-normal leading-6'
                value={bio}
                onChange={onBioChange}
              />
            </div>
          ) : (
            bio
          )}
        </div>
      </div>
    </div>
  )

  const renderTopInfo = () => (
    <div className='w-full space-y-4'>
      <ProfileGeneralRow title={translate('location')}>
        {editMode ? (
          <Select
            className='text-gray-4a flex-grow shadow-4px'
            onInputChange={setLocationsQuery}
            debounce={200}
            noOptionsText={translate('noLocationsFound')}
            selected={location}
            options={locations.map(location => ({
              value: location,
              label: location,
            }))}
            onChange={handleLocationChange}
            autocomplete
            highlight
            isLoading={isLoadingLocations}
          />
        ) : (
          <div className='flex flex-grow text-gray-4a'>
            {location?.label || data.location}
          </div>
        )}
      </ProfileGeneralRow>
      <ProfileGeneralRow title={translate('language')}>
        {editMode ? (
          <Select
            className='text-gray-4a flex-grow shadow-4px'
            selected={language}
            options={languagesOption}
            onChange={handleLanguageChange}
            autocomplete
            highlight
          />
        ) : (
          <div className='flex flex-grow text-gray-4a'>
            {language?.label || defaultLanguage.label}
          </div>
        )}
      </ProfileGeneralRow>
      <ProfileGeneralRow title={translate('categories')}>
        {!categories.length && !editMode ? (
          <span className='text-gray-4a font-medium text-base leading-5'>
            {translate('none')}
          </span>
        ) : editMode ? (
          <Categories value={categories} onChange={handleCategoriesChange} />
        ) : (
          <div className='flex whitespace-pre-wrap text-gray-4a'>
            {categories.join(', ')}
          </div>
        )}
      </ProfileGeneralRow>
      <ProfileGeneralRow title={translate('pastelReputationScore')}>
        <StarRate rate={data.reputation} />
        <div className='pl-2 text-gray-500'>{data.reputation.toFixed(2)}</div>
      </ProfileGeneralRow>
    </div>
  )

  const renderHighestSalePriceReceived = () => (
    <ProfileGeneralRow title={translate('highestSalePriceReceived')}>
      <div className='flex items-center'>
        {!data.highestFeeReceived.value ? (
          <span className='cursor-pointer text-gray-4a text-base leading-5'>
            0 {currencyName}
          </span>
        ) : (
          <>
            <Tooltip
              type='top'
              width={220}
              content={
                <p className='mb-0 px-2 py-1 text-xs leading-5 text-gray-fc'>
                  ~{nativeCurrency && getSymbolFromCurrency(nativeCurrency)}
                  {currentPrice}{' '}
                  <span className='italic font-normal'>
                    {translate('basedOnCurrentPSLPrice', { currencyName })}
                  </span>
                </p>
              }
            >
              <span className='cursor-pointer font-medium text-gray-4a text-base leading-5'>
                {formatPrice(data.highestFeeReceived.value, currencyName)}
              </span>
            </Tooltip>
            {data.highestFeeReceived.comment && (
              <span className='ml-15px bg-gray-e6 text-gray-4a rounded px-5px font-black text-sm leading-6'>
                {translate('top')} #{data.highestFeeReceived.comment}
              </span>
            )}
          </>
        )}
      </div>
    </ProfileGeneralRow>
  )

  const renderTotalCombinedSalesTooltip = () => (
    <Tooltip
      type='top'
      width={220}
      content={
        <p className='mb-0 px-2 py-1 text-xs leading-5 text-gray-fc'>
          ~{nativeCurrency && getSymbolFromCurrency(nativeCurrency)}
          {currentPrice}{' '}
          <span className='italic font-normal'>
            {translate('basedOnCurrentPSLPrice', { currencyName })}
          </span>
        </p>
      }
    >
      <span className='cursor-pointer text-gray-4a text-base leading-5'>
        {formatPrice(data.totalSalesAmount.value, currencyName)}
      </span>
    </Tooltip>
  )

  const renderTotalCombinedSales = () => (
    <ProfileGeneralRow title={translate('totalCombinedSales')}>
      <div className='flex items-center'>
        {!data.totalSalesAmount.comment ? (
          <span className='cursor-pointer text-gray-4a text-base leading-5'>
            0 {currencyName}
          </span>
        ) : (
          <>
            {renderTotalCombinedSalesTooltip()}
            {data.totalSalesAmount.comment && (
              <span className='ml-15px bg-gray-e6 text-gray-4a rounded px-5px font-black text-sm leading-6'>
                {translate('top')} #{data.totalSalesAmount.comment}
              </span>
            )}
          </>
        )}
      </div>
    </ProfileGeneralRow>
  )

  const renderTotalNFTsSold = () => (
    <ProfileGeneralRow title={translate('totalNFTsSold')}>
      <span className='text-base leading-5'>{data.totalItemsSold}</span>
    </ProfileGeneralRow>
  )

  return (
    <div className='flex-grow w-full lg:w-3/5 pr-60px'>
      {renderTopInfo()}
      <div className='w-full mt-98px space-y-4'>
        {renderHighestSalePriceReceived()}
        {renderTotalCombinedSales()}
        {renderTotalNFTsSold()}
      </div>
      {renderBioAndEditButton()}
      <NSFWControls />
    </div>
  )
}
