import { SetStateAction } from "react";
import { SortOption } from "./sortingSlice";
type Option = { value: string; label: string };

export const inputFieldss = {
 options: [
   { label: 'Frontend Developer', value: 'frontend_developer' },
   { label: 'Backend Developer', value: 'backend_developer' },
   { label: 'Full Stack Developer', value: 'full_stack_developer' },
   { label: 'UI/UX Designer', value: 'ui_ux_designer' },
   { label: 'DevOps Engineer', value: 'devops_engineer' },
   { label: 'Cybersecurity Analyst', value: 'cybersecurity_analyst' },
   { label: 'Cloud Engineer', value: 'cloud_engineer' },
   { label: 'Data Scientist', value: 'data_scientist' },
   { label: 'Machine Learning Engineer', value: 'ml_engineer' },
   { label: 'IT Support Specialist', value: 'it_support_specialist' },
 ],
};

export const options: Option[] = [
  { value: 'software_dev', label: 'Software Development' },
  { value: 'cloud_computing', label: 'Cloud Computing' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'data_science', label: 'Data Science' },
  { value: 'networking', label: 'Networking' },
  { value: 'ui_ux', label: 'UI/UX Design' },
  { value: 'ai_ml', label: 'Artificial Intelligence & Machine Learning' },
  { value: 'devops', label: 'DevOps' },
  { value: 'it_consulting', label: 'IT Consulting' },
  { value: 'qa_testing', label: 'Quality Assurance & Testing' },
];

export const stepperData = [
  { id: '01', name: 'Column Selector' },
  { id: '02', name: 'Filters' },
  { id: '03', name: 'Sorting' },
  { id: '04', name: 'Group By' },
];
export const filtersdata = [
    { columnType: 'String' },
    { columnType: 'Number' },
    { columnType: 'Date' },
    { columnType: 'DateTime' },
    { columnType: 'Time' },
    { columnType: 'Binary' },
    { columnType: 'Media' },
    { columnType: 'Dropdown' },
  ]

  export const operationOptions = [
    { value: 'Sum', label: 'Sum' },
    { value: 'Average', label: 'Average' },
    { value: 'Min', label: 'Min' },
    { value: 'Max', label: 'Max' },
    { value: 'Count', label: 'Count' },
    { value: 'Count Distinct', label: 'Count Distinct' },
  ];

export interface FilterType {
  id: string;
  isChild: boolean;
  operator: string;
  selectedColumn: string;
  selectedFilterConditionValue: string;
  inputValues: Record<string, string>;
  children?: FilterType[];
}

export interface ParentFilterProps {
  filter: FilterType;
  filtersdata: any[];
  addFilter: (parentId: string, isGroup: boolean) => void;
  deleteFilter: (id: string) => void;
  depth?: number;
  setParentBorderColors: React.Dispatch<SetStateAction<boolean>>;
  borderColor: string;
  setBorderColor: React.Dispatch<SetStateAction<string>>;
  openChildAsPerIndex: string | null;
  setOpenChildAsPerIndex: React.Dispatch<SetStateAction<string | null>>;
}

export interface SortingOptionProps {
  option: SortOption;
  index: number;
  filtersdata: { columnType: string }[];
}