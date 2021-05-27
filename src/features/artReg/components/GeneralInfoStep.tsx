import React from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { FormControl, Input, Textarea } from '../../common'
import { Button } from '../../common/Button'
import cstyles from '../../common/Common.module.css'
import styles from './ArtRegForm.module.css'
import { IArtRegFormData, setFormData, setStep } from '../artRegSlice'

export function GeneralInfoStep(): JSX.Element {
  const {
    title,
    copies,
    category,
    externalProfile,
    description,
    compensation,
  } = useAppSelector(state => state.artRegForm)

  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm()

  function onSubmit(data: IArtRegFormData) {
    dispatch(setFormData(data))
    dispatch(setStep('ImageSelection'))
  }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.artRegFormTitle}>
        Input NFT data
      </h1>
      <h2 className={styles.artRegFormSubTitle}>
        Description
      </h2>

      <div className={styles.artRegFormProgressCircle}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.2" cx="32" cy="32" r="32" fill="#8E98A3"/>
          <circle cx="32" cy="32" r="26" fill="white"/>
          <path d="M32 3.19475C32 1.43034 33.4339 -0.0165207 35.1895 0.159342C39.3098 0.572073 43.3214 1.78176 46.9972 3.73191C50.673 5.68207 53.924 8.3254 56.576 11.5056C57.706 12.8607 57.312 14.8592 55.8511 15.8485C54.3901 16.8379 52.4177 16.4395 51.2543 15.113C49.211 12.7833 46.7557 10.8368 44.0027 9.37626C41.2496 7.91568 38.2613 6.97408 35.1865 6.58851C33.4358 6.36898 32 4.95917 32 3.19475Z" fill="#6DBD72"/>
          <path d="M23.1736 27.74L20.7796 29.954L19.5196 28.46L23.3716 25.256H25.3336V38H23.1736V27.74ZM30.334 38.864L28.84 38.324L34.456 24.356L35.95 24.932L30.334 38.864ZM42.028 35.408H36.61V33.266L41.74 25.256H44.188V33.464H46.042V35.408H44.188V38H42.028V35.408ZM42.028 28.316H41.992L38.806 33.464H42.028V28.316Z" fill="#11142D"/>
        </svg>
      </div>

      <div className={styles.artRegFormCloseButton}></div>

      <div className={styles.artRegFormInputContainer}>
        <div className={styles.artRegFormInputTitle}>
          <FormControl title='Title'>
            <Input
              {...register('title')}
              placeholder='The Starry Night'
              defaultValue={title}
              onChange={() => null}
              // onClick={handleSubmit(onSubmit)}
            />
          </FormControl>
        </div>

        <div className={styles.artRegFormInputCategoryContainer}>
          <div className={styles.artRegFormInputCategory}>
            <FormControl title='Category'>
              <Input
                {...register('category')}
                placeholder='Choose'
                defaultValue={category}
              />
            </FormControl>
          </div>

          <div className={styles.artRegFormInputCollection}>
            <FormControl title='Collection'>
              <Input
                {...register('collection')}
                placeholder='Choose'
                defaultValue={category}
              />
            </FormControl>
            <div className={styles.artRegFormInputCollectionPlusButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="22" height="22" rx="11" stroke="#3F9AF7" stroke-width="2"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2775 7.6198C11.2891 7.06764 11.7462 6.62943 12.2983 6.64103C12.8505 6.65263 13.2887 7.10965 13.2771 7.66181L13.2063 11.0298L16.5751 10.959C17.1272 10.9474 17.5843 11.3857 17.5959 11.9378C17.6075 12.49 17.1693 12.947 16.6171 12.9586L13.1643 13.0311L13.0918 16.4839C13.0802 17.0361 12.6231 17.4743 12.071 17.4627C11.5188 17.4511 11.0806 16.9941 11.0922 16.4419L11.163 13.0732L7.79497 13.1439C7.24281 13.1555 6.78579 12.7173 6.77419 12.1652C6.76259 11.613 7.2008 11.156 7.75297 11.1444L11.205 11.0719L11.2775 7.6198Z" fill="#3F9AF7"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.artRegFormInputCopiesContainer}>
          <div className={styles.artRegFormInputCopies}>
            <FormControl title='Copies'>
              <Input
                {...register('copies')}
                type='number'
                min={0}
                defaultValue={100}
              />
            </FormControl>

            <div className={styles.artRegFormInputCopiesStepper}>
              <svg width="133" height="20" viewBox="0 0 133 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99981 10.002L9.99922 6.88307C9.99922 6.65266 10.186 6.46587 10.4164 6.46587C10.6468 6.46587 10.8336 6.65266 10.8336 6.88307L10.833 10.002L13.9519 10.0014C14.1824 10.0014 14.3691 10.1882 14.3691 10.4186C14.3691 10.649 14.1824 10.8358 13.9519 10.8358L10.833 10.8352L10.8336 13.9541C10.8336 14.1845 10.6468 14.3713 10.4164 14.3713C10.186 14.3713 9.99922 14.1845 9.99922 13.9541L9.99981 10.8352L6.88088 10.8358C6.65047 10.8358 6.46368 10.649 6.46368 10.4186C6.46368 10.1882 6.65047 10.0014 6.88088 10.0014L9.99981 10.002ZM10.416 19.168C5.58352 19.168 1.66602 15.2505 1.66602 10.418C1.66602 5.58547 5.58352 1.66797 10.416 1.66797C15.2485 1.66797 19.166 5.58547 19.166 10.418C19.166 15.2505 15.2485 19.168 10.416 19.168ZM10.416 18.3346C14.7883 18.3346 18.3327 14.7902 18.3327 10.418C18.3327 6.04571 14.7883 2.5013 10.416 2.5013C6.04376 2.5013 2.49935 6.04571 2.49935 10.418C2.49935 14.7902 6.04376 18.3346 10.416 18.3346Z" fill="#334D6E"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M123.416 19.168C118.584 19.168 114.666 15.2505 114.666 10.418C114.666 5.58547 118.584 1.66797 123.416 1.66797C128.249 1.66797 132.166 5.58547 132.166 10.418C132.166 15.2505 128.249 19.168 123.416 19.168ZM123.416 18.3346C127.788 18.3346 131.333 14.7902 131.333 10.418C131.333 6.04571 127.788 2.5013 123.416 2.5013C119.044 2.5013 115.499 6.04571 115.499 10.418C115.499 14.7902 119.044 18.3346 123.416 18.3346ZM120.083 10.8346C119.853 10.8346 119.666 10.6481 119.666 10.418C119.666 10.1878 119.853 10.0013 120.083 10.0013H126.749C126.979 10.0013 127.166 10.1878 127.166 10.418C127.166 10.6481 126.979 10.8346 126.749 10.8346H120.083Z" fill="#334D6E"/>
              </svg>
            </div>
          </div>

          <div className={styles.artRegFormInputCompensation}>
            <FormControl title='Compensation'>
              <Input
                {...register('compensation')}
                placeholder='royalty'
                defaultValue={compensation}
              />
            </FormControl>
          </div>

          <div className={styles.artRegFormInputCompensationPercent}>
            <FormControl title='&nbsp;'>
              <Input
                {...register('royaltyPercent')}
                type='number'
                min={0}
                defaultValue={12}
              />
            </FormControl>

            <div className={styles.artRegFormInputCopiesStepper}>
              <svg width="133" height="20" viewBox="0 0 133 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99981 10.002L9.99922 6.88307C9.99922 6.65266 10.186 6.46587 10.4164 6.46587C10.6468 6.46587 10.8336 6.65266 10.8336 6.88307L10.833 10.002L13.9519 10.0014C14.1824 10.0014 14.3691 10.1882 14.3691 10.4186C14.3691 10.649 14.1824 10.8358 13.9519 10.8358L10.833 10.8352L10.8336 13.9541C10.8336 14.1845 10.6468 14.3713 10.4164 14.3713C10.186 14.3713 9.99922 14.1845 9.99922 13.9541L9.99981 10.8352L6.88088 10.8358C6.65047 10.8358 6.46368 10.649 6.46368 10.4186C6.46368 10.1882 6.65047 10.0014 6.88088 10.0014L9.99981 10.002ZM10.416 19.168C5.58352 19.168 1.66602 15.2505 1.66602 10.418C1.66602 5.58547 5.58352 1.66797 10.416 1.66797C15.2485 1.66797 19.166 5.58547 19.166 10.418C19.166 15.2505 15.2485 19.168 10.416 19.168ZM10.416 18.3346C14.7883 18.3346 18.3327 14.7902 18.3327 10.418C18.3327 6.04571 14.7883 2.5013 10.416 2.5013C6.04376 2.5013 2.49935 6.04571 2.49935 10.418C2.49935 14.7902 6.04376 18.3346 10.416 18.3346Z" fill="#334D6E"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M123.416 19.168C118.584 19.168 114.666 15.2505 114.666 10.418C114.666 5.58547 118.584 1.66797 123.416 1.66797C128.249 1.66797 132.166 5.58547 132.166 10.418C132.166 15.2505 128.249 19.168 123.416 19.168ZM123.416 18.3346C127.788 18.3346 131.333 14.7902 131.333 10.418C131.333 6.04571 127.788 2.5013 123.416 2.5013C119.044 2.5013 115.499 6.04571 115.499 10.418C115.499 14.7902 119.044 18.3346 123.416 18.3346ZM120.083 10.8346C119.853 10.8346 119.666 10.6481 119.666 10.418C119.666 10.1878 119.853 10.0013 120.083 10.0013H126.749C126.979 10.0013 127.166 10.1878 127.166 10.418C127.166 10.6481 126.979 10.8346 126.749 10.8346H120.083Z" fill="#334D6E"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.artRegFormInputExternalProfile}>
          <FormControl title='Extenral Profile'>
            <Input
              {...register('externalProfile')}
              placeholder='https://behance.com/'
              defaultValue={externalProfile}
            />
          </FormControl>
        </div>

        <div className={styles.artRegFormInputDescription}>
          <div className={styles.artRegFormInputDescriptionControls}>
            <input id="switch-1" type="checkbox" className={styles.artRegFormInputDescriptionControlsCheckbox} />
            <div className={styles.artRegFormInputDescriptionControlsCheckboxButton}>
              <div className={styles.artRegFormInputDescriptionControlsCheckboxButtonActive}>
                <svg width="35" height="20" viewBox="0 0 35 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.2857 0H9.99987C4.48711 0 0 4.4858 0 9.99987C0 15.5142 4.48711 20 9.99987 20H24.2857C29.7985 20 34.2856 15.5142 34.2856 9.99987C34.2856 4.4858 29.7985 0 24.2857 0V0Z" fill="#57657B" fill-opacity="0.15"/>
                  <path d="M15.7157 9.99933C15.7157 13.1553 13.1572 15.7138 10.0013 15.7138C6.84534 15.7138 4.28711 13.1553 4.28711 9.99933C4.28711 6.84339 6.84534 4.28516 10.0013 4.28516C13.1572 4.28516 15.7157 6.84339 15.7157 9.99933Z" fill="#FAFAFA"/>
                </svg>
              </div>
              <div className={styles.artRegFormInputDescriptionControlsCheckboxButtonInactive}>
                <svg width="35" height="20" viewBox="0 0 35 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.2857 0H9.99987C4.48711 0 0 4.4858 0 9.99987C0 15.5142 4.48711 20 9.99987 20H24.2857C29.7985 20 34.2856 15.5142 34.2856 9.99987C34.2856 4.4858 29.7985 0 24.2857 0V0Z" fill="#57657B" fill-opacity="0.15"/>
                  <path d="M15.7157 9.99933C15.7157 13.1553 13.1572 15.7138 10.0013 15.7138C6.84534 15.7138 4.28711 13.1553 4.28711 9.99933C4.28711 6.84339 6.84534 4.28516 10.0013 4.28516C13.1572 4.28516 15.7157 6.84339 15.7157 9.99933Z" fill="#FAFAFA"/>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.artRegFormInputDescriptionControlsLabel}>Green</div>
          <div className={styles.artRegFormInputDescriptionControlsInfo}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0.9375C5 0.9375 0.9375 5 0.9375 10C0.9375 15 5 19.0625 10 19.0625C15 19.0625 19.0625 15 19.0625 10C19.0625 5 15 0.9375 10 0.9375ZM10 1.875C14.4844 1.875 18.125 5.51562 18.125 10C18.125 14.4844 14.4844 18.125 10 18.125C5.51562 18.125 1.875 14.4844 1.875 10C1.875 5.51562 5.51562 1.875 10 1.875ZM10 5.9375C9.73438 5.9375 9.53125 6.14062 9.53125 6.40625V7.1875C9.53125 7.45312 9.73438 7.65625 10 7.65625C10.2656 7.65625 10.4688 7.45312 10.4688 7.1875V6.40625C10.4688 6.14062 10.2656 5.9375 10 5.9375ZM10 9.0625C9.73438 9.0625 9.53125 9.26562 9.53125 9.53125V13.5938C9.53125 13.8594 9.73438 14.0625 10 14.0625C10.2656 14.0625 10.4688 13.8594 10.4688 13.5938V9.53125C10.4688 9.26562 10.2656 9.0625 10 9.0625Z" fill="#8E98A3"/>
          </svg>
          </div>
          <FormControl title='Description'>
            <Textarea
              {...register('description')}
              defaultValue={description}
              placeholder=''
            />
          </FormControl>
        </div>

        <Button text='Go to preview' type='submit' className={styles.artRegFormSubmit} />
      </div>
    </form>
  )
}
