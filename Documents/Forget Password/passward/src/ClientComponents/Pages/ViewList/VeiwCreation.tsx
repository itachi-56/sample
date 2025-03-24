'use client';
import type React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/Components/Ui/Button';
import DropdownSearch from '@/Components/Ui/DropdownSearch';
import PageHeader from '@/Components/Ui/PageHeader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import TextArea from '@/Components/Ui/TextArea';
import { TextInput } from '@/Components/Ui/TextInput';
import Toggle from '@/Components/Ui/Toggle';
import Filters from './Filters';
import { Sorting } from './Sorting';
import GroupBy from './GroupBy';
import StepperComponent from '@/Components/Ui/StepperComponent';
import { updateField, setCurrentStep } from './VeiwSlice/VeiwCreationSlice';
import { ColumnSelector } from './ColumnSelector';
import { stepperData, options } from './VeiwSlice/interface';
import FormContentsLayout from '@/Layouts/Pages/FormContentsLayout';

const ViewCreation = () => {
  const dispatch = useDispatch();
  const viewCreationState = useSelector((state: any) => state.viewCreation);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handleChange = (name: string, value: string | boolean) => {
    dispatch(updateField({ name, value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Values:', viewCreationState);
  };

  return (
    <FormContentsLayout>
      <div className="bg-page-title-bg-color flex flex-col md:flex-row md:items-center gap-[150px] px-6">
        {viewCreationState.currentStep === '0' && (
          <div>
            <PageHeader header={'VIEW DESIGNER-CREATION'} />
          </div>
        )}

        {viewCreationState.currentStep !== '0' && (
          <div>
            <PageHeader header={'VIEW NAME'} />
            <span>Form Name</span>
          </div>
        )}
        {viewCreationState.currentStep !== '0' && (
          <StepperComponent
            stepper={stepperData}
            componentsId={viewCreationState.currentStep}
            setComponentsId={(step: string) => dispatch(setCurrentStep(step))}
          />
        )}
      </div>
      <div className="bg-form-container-bg-color p-form-container-padding">
        <div className="h-full border form-border-color rounded-lg overflow-y-auto bg-form-bg-color">
          <div className="pl-[47px] pt-[18px]">
            {viewCreationState.currentStep === '0' && (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-16">
                  <div className="grid grid-cols-3 ">
                    <TextInput
                      id={'viewName'}
                      name={'viewName'}
                      helperText={false}
                      height="35px"
                      label={'View Name'}
                      labelPosition={'top'}
                      placeholder={''}
                      width={'365px'}
                      onChange={handleInputChange}
                      defaultValue={viewCreationState.viewName}
                    />
                    <TextArea
                      name={'description'}
                      label={'Description'}
                      labelPosition={'top'}
                      placeholder="Add a description"
                      height="71px"
                      width={'365px'}
                      onChange={handleInputChange}
                      defaultValue={viewCreationState.description}
                    />
                    <DropdownSearch
                      label="Form Name"
                      name="formName"
                      labelPosition="top"
                      search={true}
                      options={options}
                      width="365px"
                      height="35px"
                      id="formName"
                      value={
                        options.find(
                          (option) =>
                            option.value === viewCreationState.formName
                        ) || null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 ">
                    <ReadOnlyField
                      label={'Primary Table'}
                      height="35px"
                      name={'primaryKey'}
                      value={viewCreationState.primaryKey}
                      id={'primaryKey'}
                      icon={true}
                      width={'365px'}
                    />
                    <Toggle
                      id={'defaultToggle'}
                      name={'isDefault'}
                      label={'Default'}
                      labelPosition={'top'}
                      onToggle={(value) => handleChange('isDefault', value)}
                      value={viewCreationState.isDefault}
                    />
                    <Toggle
                      id={'groupingToggle'}
                      name={'isGrouping'}
                      label={'Grouping'}
                      labelPosition={'top'}
                      onToggle={(value) => handleChange('isGrouping', value)}
                      value={viewCreationState.isGrouping}
                    />
                  </div>
                  <div className="flex gap-3 pb-5 ">
                    <Button
                      type="submit"
                      name={'Start Building'}
                      onClick={() => dispatch(setCurrentStep('01'))}
                    />
                    <Button type="button" name={'Cancel'} />
                  </div>
                </div>
              </form>
            )}
            {viewCreationState.currentStep === '01' && (
              <ColumnSelector
                setComponentsId={(step: string) =>
                  dispatch(setCurrentStep(step))
                }
              />
            )}
            {viewCreationState.currentStep === '02' && (
              <Filters
                setComponentsId={(step: string) =>
                  dispatch(setCurrentStep(step))
                }
              />
            )}
            {viewCreationState.currentStep === '03' && (
              <Sorting
                setComponentsId={(step: string) =>
                  dispatch(setCurrentStep(step))
                }
              />
            )}
            {viewCreationState.currentStep === '04' && (
              <GroupBy
                setComponentsId={(step: string) =>
                  dispatch(setCurrentStep(step))
                }
              />
            )}
          </div>
        </div>
      </div>
    </FormContentsLayout>
  );
};

export default ViewCreation;