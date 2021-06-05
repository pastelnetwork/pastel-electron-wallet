import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import RUG from 'react-upload-gallery'

// import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
// import { FormControl } from '../../../common/components/FormControl/FormControl'
// import { Button } from '../../common'
import { Textarea } from '../../common'
import styles from './ArtRegForm.module.css'
import 'react-upload-gallery/dist/style.css'

// import { IArtRegFormData, setFormData, setStep } from '../artRegSlice'
import Select from 'react-select'

import formProgressCircle01 from '../../../common/assets/images/artRegForm/formProgressCircle01.svg'
import formProgressCircle02 from '../../../common/assets/images/artRegForm/formProgressCircle02.svg'
import formCloseButton from '../../../common/assets/images/artRegForm/formCloseButton.svg'
import formPlusButton from '../../../common/assets/images/artRegForm/formPlusButton.svg'
import formStepperPlusButton from '../../../common/assets/images/artRegForm/formStepperPlusButton.svg'
import formStepperMinusButton from '../../../common/assets/images/artRegForm/formStepperMinusButton.svg'
import formInfoButton from '../../../common/assets/images/artRegForm/formInfoButton.svg'

// interface artRegFormStep1Values {
//   title: string
//   category: string
//   copies: number
// }

export function GeneralInfoStep(): JSX.Element {
  // const {
  //   title,
  //   // copies,
  //   category,
  //   externalProfile,
  //   description,
  //   // compensation,
  // } = useAppSelector(state => state.artRegForm)

  // const dispatch = useAppDispatch()
  // // const { register, handleSubmit } = useForm()

  // function goToStep2(data: IArtRegFormData) {
  //   dispatch(setFormData(data))
  //   dispatch(setStep('ImageSelection'))
  // }

  const categoriesOptions = [
    { value: 'option1', label: 'First' },
    { value: 'option2', label: 'Second' },
    { value: 'option3', label: 'Third' },
    { value: 'option4', label: 'Fourth' },
    { value: 'option5', label: 'Fifth' },
    { value: 'option6', label: 'Sixth' },
  ]

  const compensationOptions = [
    { value: 'royalty', label: 'Royalty' },
    { value: 'option2', label: 'Percent' },
    { value: 'option3', label: 'Big thanks' },
  ]

  const [copies, setCountOne] = useState(100)
  const [royaltyPercent, setCountTwo] = useState(10)
  const royaltyPercentString = `${royaltyPercent}%`

  const drugAreaInitialState = [
    {
      name: 'Item 1',
      size: '232kb',
      source:
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4050&q=80',
    },
  ]

  function showHideHeader() {
    const headerElement = document.getElementById('headerPanel')
    headerElement?.classList.toggle('hideHeaderPanel')
  }

  function goToStep2() {
    console.log('Go to step 2.')
    const stepOneElement = document.getElementById('artRegFormStepOne')
    stepOneElement?.classList.toggle('hiddenStep')

    const stepTwoElement = document.getElementById('artRegFormStepTwo')
    stepTwoElement?.classList.toggle('unhiddenStep')
  }

  return (
    <Formik
      initialValues={{ title: '', category: '', copies: copies }}
      onSubmit={(values, actions) => {
        console.log({ values, actions })
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
    >
      <Form>
        <div className={styles.artRegFormStepOne} id='artRegFormStepOne'>
          <h1 className={styles.artRegFormTitle}>Input NFT data</h1>
          <h2 className={styles.artRegFormSubTitle}>Description</h2>

          <div className={styles.artRegFormProgressCircle}>
            <img
              src={formProgressCircle01}
              className={styles.artRegFormProgressCircleActive}
            />
          </div>

          <div
            className={styles.artRegFormCloseButton}
            onClick={showHideHeader}
          >
            <Link to='/dashboard' className='flex items-center'>
              <img src={formCloseButton} />
            </Link>
          </div>

          <div className={styles.artRegFormInputContainer}>
            <div className={styles.artRegFormRow}>
              <label className={styles.artRegFormInputTitle} htmlFor='title'>
                <p className={styles.artRegFormLabel}>Title</p>
                <Field
                  id='title'
                  name='title'
                  placeholder='At least 10 characters'
                />
              </label>
            </div>

            <div className={styles.artRegFormRow}>
              <label
                className={styles.artRegFormInputCategory}
                htmlFor='category'
              >
                <p className={styles.artRegFormLabel}>Category</p>
                <Select
                  name='category'
                  isMulti
                  className={styles.artRegFormInputCategorySelect}
                  classNamePrefix='react-select'
                  placeholder='choose'
                  options={categoriesOptions}
                  styles={{
                    control: styles => ({
                      ...styles,
                      borderColor: '#9ca0a533',
                    }),
                    input: base => ({
                      ...base,
                      position: 'absolute',
                      opacity: '0',
                    }),
                    valueContainer: base => ({
                      ...base,
                      minHeight: '38px',
                    }),
                    multiValue: base => ({
                      ...base,
                      position: 'relative',
                      display: 'inline-block',
                      backgroundColor: '#718096',
                      borderRadius: '12px',
                      padding: '0px 8px',
                    }),
                    multiValueLabel: base => ({
                      ...base,
                      color: '#F8F8FA',
                      paddingLeft: '0px',
                    }),
                    multiValueRemove: styles => ({
                      ...styles,
                      color: 'transparent',
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      height: '100%',
                      borderRadius: '12px',
                      ':hover': {
                        backgroundColor: '#718096',
                        color: 'white',
                      },
                    }),
                    indicatorSeparator: base => ({
                      ...base,
                      display: 'none',
                    }),
                  }}
                />
              </label>

              <label
                className={styles.artRegFormInputCollection}
                htmlFor='collection'
              >
                <p className={styles.artRegFormLabel}>Collection</p>
                <Field id='collection' name='collection' placeholder='choose' />

                <div className={styles.artRegFormInputCollectionPlusButton}>
                  <img src={formPlusButton} />
                </div>
              </label>
            </div>

            <div className={styles.artRegFormRow}>
              <label className={styles.artRegFormInputCopies} htmlFor='copies'>
                <p className={styles.artRegFormLabel}>Copies</p>
                <Field id='copies' name='copies' value={copies} />

                <div
                  className={styles.artRegFormInputCopiesStepperPlus}
                  onClick={() => setCountOne(copies + 10)}
                >
                  <img src={formStepperPlusButton} />
                </div>

                <div
                  className={styles.artRegFormInputCopiesStepperMinus}
                  onClick={() => setCountOne(copies - 10)}
                >
                  <img src={formStepperMinusButton} />
                </div>
              </label>

              <label
                className={styles.artRegFormInputCompensation}
                htmlFor='compensation'
              >
                <p className={styles.artRegFormLabel}>Compensation</p>
                <Select
                  name='compensation'
                  isMulti
                  className={styles.artRegFormInputCategorySelect}
                  classNamePrefix='react-select'
                  placeholder='royalty'
                  options={compensationOptions}
                  styles={{
                    control: styles => ({
                      ...styles,
                      borderColor: '#9ca0a533',
                    }),
                    input: base => ({
                      ...base,
                      position: 'absolute',
                      opacity: '0',
                    }),
                    valueContainer: base => ({
                      ...base,
                      minHeight: '38px',
                    }),
                    multiValue: base => ({
                      ...base,
                      position: 'relative',
                      display: 'inline-block',
                      backgroundColor: '#718096',
                      borderRadius: '12px',
                      padding: '0px 8px',
                    }),
                    multiValueLabel: base => ({
                      ...base,
                      color: '#F8F8FA',
                      paddingLeft: '0px',
                    }),
                    multiValueRemove: styles => ({
                      ...styles,
                      color: 'transparent',
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      height: '100%',
                      borderRadius: '12px',
                      ':hover': {
                        backgroundColor: '#718096',
                        color: 'white',
                      },
                    }),
                    indicatorSeparator: base => ({
                      ...base,
                      display: 'none',
                    }),
                  }}
                />
              </label>

              <label
                className={styles.artRegFormInputCompensationPercent}
                htmlFor='royaltyPercent'
              >
                <p className={styles.artRegFormLabel}>&nbsp;</p>
                <Field
                  id='royaltyPercent'
                  name='royaltyPercent'
                  value={royaltyPercentString}
                />

                <div
                  className={styles.artRegFormInputCopiesStepperPlus}
                  onClick={() => setCountTwo(royaltyPercent + 1)}
                >
                  <img src={formStepperPlusButton} />
                </div>

                <div
                  className={styles.artRegFormInputCopiesStepperMinus}
                  onClick={() => setCountTwo(royaltyPercent - 1)}
                >
                  <img src={formStepperMinusButton} />
                </div>
              </label>
            </div>

            <div className={styles.artRegFormRow}>
              <label className={styles.artRegFormInputExternalProfile}>
                <p className={styles.artRegFormLabel}>External profile</p>
                <Field
                  id='externalProfile'
                  name='externalProfile'
                  placeholder='website or social profile link'
                />
              </label>
            </div>

            <div className={styles.artRegFormRow}>
              <label
                className={styles.artRegFormInputDescription}
                htmlFor='description'
              >
                <p className={styles.artRegFormLabel}>Description</p>
                <div className={styles.artRegFormInputDescriptionControls}>
                  <input
                    id='switch-1'
                    type='checkbox'
                    className={
                      styles.artRegFormInputDescriptionControlsCheckbox
                    }
                  />
                  <label
                    className={
                      styles.artRegFormInputDescriptionControlsCheckboxLabel
                    }
                    htmlFor='switch-1'
                  >
                    <div
                      className={
                        styles.artRegFormInputDescriptionControlsCheckboxButton
                      }
                    >
                      <div
                        className={
                          styles.artRegFormInputDescriptionControlsCheckboxButtonSwitch
                        }
                      ></div>
                    </div>
                  </label>
                </div>
                <div className={styles.artRegFormInputDescriptionControlsLabel}>
                  Green
                </div>
                <div className={styles.artRegFormInputDescriptionControlsInfo}>
                  <img src={formInfoButton} />
                </div>

                <Textarea
                  // defaultValue={description}
                  placeholder=''
                  name='description'
                  // onChange={this.handleOnChange}
                />
              </label>
            </div>

            <div className={styles.artRegFormRow}>
              <div onClick={goToStep2} className={styles.artRegFormSubmit}>
                Go to preview
              </div>
              {/* <Button
                text='Go to preview'
                type='submit'
                className={styles.artRegFormSubmit}
              /> */}
            </div>
          </div>
        </div>

        <div className={styles.artRegFormStepTwo} id='artRegFormStepTwo'>
          <h1 className={styles.artRegFormTitle}>Upload image</h1>
          <h2 className={styles.artRegFormSubTitle}>Description</h2>

          <div className={styles.artRegFormProgressCircle}>
            <img
              src={formProgressCircle02}
              className={styles.artRegFormProgressCircleActive}
            />
          </div>

          <div
            className={styles.artRegFormCloseButton}
            onClick={showHideHeader}
          >
            <Link to='/dashboard' className='flex items-center'>
              <img src={formCloseButton} />
            </Link>
          </div>

          <RUG
            action='http://example.com/upload'
            initialState={drugAreaInitialState}
          />
        </div>
      </Form>
    </Formik>
  )
}
