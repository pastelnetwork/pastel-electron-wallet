import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

// import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
// import { FormControl } from '../../../common/components/FormControl/FormControl'
import { Textarea, Button } from '../../common'
import styles from './ArtRegForm.module.css'
// import { IArtRegFormData, setFormData, setStep } from '../artRegSlice'
import Select from 'react-select'

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
  // const { register, handleSubmit } = useForm()

  // !!!!
  // function onSubmit(data: IArtRegFormData) {
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

  function showHideHeader() {
    const headerElement = document.getElementById('headerPanel')
    headerElement?.classList.toggle('hideHeaderPanel')
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
        <h1 className={styles.artRegFormTitle}>Input NFT data</h1>
        <h2 className={styles.artRegFormSubTitle}>Description</h2>

        <div className={styles.artRegFormProgressCircle}>
          <svg
            width='64'
            height='64'
            viewBox='0 0 64 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle opacity='0.2' cx='32' cy='32' r='32' fill='#8E98A3' />
            <circle cx='32' cy='32' r='26' fill='white' />
            <path
              d='M32 3.19475C32 1.43034 33.4339 -0.0165207 35.1895 0.159342C39.3098 0.572073 43.3214 1.78176 46.9972 3.73191C50.673 5.68207 53.924 8.3254 56.576 11.5056C57.706 12.8607 57.312 14.8592 55.8511 15.8485C54.3901 16.8379 52.4177 16.4395 51.2543 15.113C49.211 12.7833 46.7557 10.8368 44.0027 9.37626C41.2496 7.91568 38.2613 6.97408 35.1865 6.58851C33.4358 6.36898 32 4.95917 32 3.19475Z'
              fill='#6DBD72'
            />
            <path
              d='M23.1736 27.74L20.7796 29.954L19.5196 28.46L23.3716 25.256H25.3336V38H23.1736V27.74ZM30.334 38.864L28.84 38.324L34.456 24.356L35.95 24.932L30.334 38.864ZM42.028 35.408H36.61V33.266L41.74 25.256H44.188V33.464H46.042V35.408H44.188V38H42.028V35.408ZM42.028 28.316H41.992L38.806 33.464H42.028V28.316Z'
              fill='#11142D'
            />
          </svg>
        </div>

        <div className={styles.artRegFormCloseButton} onClick={showHideHeader}>
          <Link to='/dashboard' className='flex items-center'>
            <svg
              width='31'
              height='28'
              viewBox='0 0 31 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12.2914 10.1391C12.092 9.94798 11.7755 9.95463 11.5844 10.154C11.3933 10.3533 11.3999 10.6698 11.5993 10.8609L14.9385 14.0627L11.5997 17.2641C11.4004 17.4552 11.3937 17.7717 11.5849 17.971C11.776 18.1704 12.0925 18.177 12.2918 17.9859L15.6609 14.7554L19.03 17.9859C19.2294 18.177 19.5459 18.1704 19.737 17.971C19.9281 17.7717 19.9215 17.4552 19.7221 17.2641L16.3834 14.0627L19.7226 10.8609C19.9219 10.6698 19.9286 10.3533 19.7374 10.154C19.5463 9.95463 19.2298 9.94798 19.0305 10.1391L15.6609 13.37L12.2914 10.1391Z'
                fill='#B0B7C3'
              />
              <rect
                opacity='0.3'
                x='1.30078'
                y='0.5'
                width='28.7231'
                height='27'
                rx='7.5'
                stroke='#8E98A3'
              />
            </svg>
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
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='1'
                    y='1'
                    width='22'
                    height='22'
                    rx='11'
                    stroke='#3F9AF7'
                    stroke-width='2'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M11.2775 7.6198C11.2891 7.06764 11.7462 6.62943 12.2983 6.64103C12.8505 6.65263 13.2887 7.10965 13.2771 7.66181L13.2063 11.0298L16.5751 10.959C17.1272 10.9474 17.5843 11.3857 17.5959 11.9378C17.6075 12.49 17.1693 12.947 16.6171 12.9586L13.1643 13.0311L13.0918 16.4839C13.0802 17.0361 12.6231 17.4743 12.071 17.4627C11.5188 17.4511 11.0806 16.9941 11.0922 16.4419L11.163 13.0732L7.79497 13.1439C7.24281 13.1555 6.78579 12.7173 6.77419 12.1652C6.76259 11.613 7.2008 11.156 7.75297 11.1444L11.205 11.0719L11.2775 7.6198Z'
                    fill='#3F9AF7'
                  />
                </svg>
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
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M9.99981 10.002L9.99922 6.88307C9.99922 6.65266 10.186 6.46587 10.4164 6.46587C10.6468 6.46587 10.8336 6.65266 10.8336 6.88307L10.833 10.002L13.9519 10.0014C14.1824 10.0014 14.3691 10.1882 14.3691 10.4186C14.3691 10.649 14.1824 10.8358 13.9519 10.8358L10.833 10.8352L10.8336 13.9541C10.8336 14.1845 10.6468 14.3713 10.4164 14.3713C10.186 14.3713 9.99922 14.1845 9.99922 13.9541L9.99981 10.8352L6.88088 10.8358C6.65047 10.8358 6.46368 10.649 6.46368 10.4186C6.46368 10.1882 6.65047 10.0014 6.88088 10.0014L9.99981 10.002ZM10.416 19.168C5.58352 19.168 1.66602 15.2505 1.66602 10.418C1.66602 5.58547 5.58352 1.66797 10.416 1.66797C15.2485 1.66797 19.166 5.58547 19.166 10.418C19.166 15.2505 15.2485 19.168 10.416 19.168ZM10.416 18.3346C14.7883 18.3346 18.3327 14.7902 18.3327 10.418C18.3327 6.04571 14.7883 2.5013 10.416 2.5013C6.04376 2.5013 2.49935 6.04571 2.49935 10.418C2.49935 14.7902 6.04376 18.3346 10.416 18.3346Z'
                    fill='#334D6E'
                  />
                </svg>
              </div>

              <div
                className={styles.artRegFormInputCopiesStepperMinus}
                onClick={() => setCountOne(copies - 10)}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M10.416 19.168C5.58352 19.168 1.66602 15.2505 1.66602 10.418C1.66602 5.58547 5.58352 1.66797 10.416 1.66797C15.2485 1.66797 19.166 5.58547 19.166 10.418C19.166 15.2505 15.2485 19.168 10.416 19.168ZM10.416 18.3346C14.7883 18.3346 18.3327 14.7902 18.3327 10.418C18.3327 6.04571 14.7883 2.5013 10.416 2.5013C6.04376 2.5013 2.49935 6.04571 2.49935 10.418C2.49935 14.7902 6.04376 18.3346 10.416 18.3346ZM7.08268 10.8346C6.85256 10.8346 6.66602 10.6481 6.66602 10.418C6.66602 10.1878 6.85256 10.0013 7.08268 10.0013H13.7493C13.9795 10.0013 14.166 10.1878 14.166 10.418C14.166 10.6481 13.9795 10.8346 13.7493 10.8346H7.08268Z'
                    fill='#334D6E'
                  />
                </svg>
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
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M9.99981 10.002L9.99922 6.88307C9.99922 6.65266 10.186 6.46587 10.4164 6.46587C10.6468 6.46587 10.8336 6.65266 10.8336 6.88307L10.833 10.002L13.9519 10.0014C14.1824 10.0014 14.3691 10.1882 14.3691 10.4186C14.3691 10.649 14.1824 10.8358 13.9519 10.8358L10.833 10.8352L10.8336 13.9541C10.8336 14.1845 10.6468 14.3713 10.4164 14.3713C10.186 14.3713 9.99922 14.1845 9.99922 13.9541L9.99981 10.8352L6.88088 10.8358C6.65047 10.8358 6.46368 10.649 6.46368 10.4186C6.46368 10.1882 6.65047 10.0014 6.88088 10.0014L9.99981 10.002ZM10.416 19.168C5.58352 19.168 1.66602 15.2505 1.66602 10.418C1.66602 5.58547 5.58352 1.66797 10.416 1.66797C15.2485 1.66797 19.166 5.58547 19.166 10.418C19.166 15.2505 15.2485 19.168 10.416 19.168ZM10.416 18.3346C14.7883 18.3346 18.3327 14.7902 18.3327 10.418C18.3327 6.04571 14.7883 2.5013 10.416 2.5013C6.04376 2.5013 2.49935 6.04571 2.49935 10.418C2.49935 14.7902 6.04376 18.3346 10.416 18.3346Z'
                    fill='#334D6E'
                  />
                </svg>
              </div>

              <div
                className={styles.artRegFormInputCopiesStepperMinus}
                onClick={() => setCountTwo(royaltyPercent - 1)}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M10.416 19.168C5.58352 19.168 1.66602 15.2505 1.66602 10.418C1.66602 5.58547 5.58352 1.66797 10.416 1.66797C15.2485 1.66797 19.166 5.58547 19.166 10.418C19.166 15.2505 15.2485 19.168 10.416 19.168ZM10.416 18.3346C14.7883 18.3346 18.3327 14.7902 18.3327 10.418C18.3327 6.04571 14.7883 2.5013 10.416 2.5013C6.04376 2.5013 2.49935 6.04571 2.49935 10.418C2.49935 14.7902 6.04376 18.3346 10.416 18.3346ZM7.08268 10.8346C6.85256 10.8346 6.66602 10.6481 6.66602 10.418C6.66602 10.1878 6.85256 10.0013 7.08268 10.0013H13.7493C13.9795 10.0013 14.166 10.1878 14.166 10.418C14.166 10.6481 13.9795 10.8346 13.7493 10.8346H7.08268Z'
                    fill='#334D6E'
                  />
                </svg>
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
                  className={styles.artRegFormInputDescriptionControlsCheckbox}
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
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 0.9375C5 0.9375 0.9375 5 0.9375 10C0.9375 15 5 19.0625 10 19.0625C15 19.0625 19.0625 15 19.0625 10C19.0625 5 15 0.9375 10 0.9375ZM10 1.875C14.4844 1.875 18.125 5.51562 18.125 10C18.125 14.4844 14.4844 18.125 10 18.125C5.51562 18.125 1.875 14.4844 1.875 10C1.875 5.51562 5.51562 1.875 10 1.875ZM10 5.9375C9.73438 5.9375 9.53125 6.14062 9.53125 6.40625V7.1875C9.53125 7.45312 9.73438 7.65625 10 7.65625C10.2656 7.65625 10.4688 7.45312 10.4688 7.1875V6.40625C10.4688 6.14062 10.2656 5.9375 10 5.9375ZM10 9.0625C9.73438 9.0625 9.53125 9.26562 9.53125 9.53125V13.5938C9.53125 13.8594 9.73438 14.0625 10 14.0625C10.2656 14.0625 10.4688 13.8594 10.4688 13.5938V9.53125C10.4688 9.26562 10.2656 9.0625 10 9.0625Z'
                    fill='#8E98A3'
                  />
                </svg>
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
            <Button
              text='Go to preview'
              type='submit'
              className={styles.artRegFormSubmit}
            />
          </div>
        </div>
      </Form>
    </Formik>
  )
}
