// Form Types and Enums
export enum FormType {
  // Residence Forms
  RESIDENCE_POSITIVE = 'residence-positive',
  RESIDENCE_SHIFTED = 'residence-shifted',
  RESIDENCE_NSP = 'residence-nsp',
  RESIDENCE_ENTRY_RESTRICTED = 'residence-entry-restricted',
  RESIDENCE_UNTRACEABLE = 'residence-untraceable',

  // Office Forms
  OFFICE_POSITIVE = 'office-positive',
  OFFICE_SHIFTED = 'office-shifted',
  OFFICE_NSP = 'office-nsp',
  OFFICE_ENTRY_RESTRICTED = 'office-entry-restricted',
  OFFICE_UNTRACEABLE = 'office-untraceable',

  // Business Forms
  BUSINESS_POSITIVE = 'business-positive',
  BUSINESS_SHIFTED = 'business-shifted',
  BUSINESS_NSP = 'business-nsp',
  BUSINESS_ENTRY_RESTRICTED = 'business-entry-restricted',
  BUSINESS_UNTRACEABLE = 'business-untraceable',

  // Residence-cum-Office Forms
  RESIDENCE_CUM_OFFICE_POSITIVE = 'residence-cum-office-positive',
  RESIDENCE_CUM_OFFICE_SHIFTED = 'residence-cum-office-shifted',
  RESIDENCE_CUM_OFFICE_NSP = 'residence-cum-office-nsp',
  RESIDENCE_CUM_OFFICE_ENTRY_RESTRICTED = 'residence-cum-office-entry-restricted',
  RESIDENCE_CUM_OFFICE_UNTRACEABLE = 'residence-cum-office-untraceable',
}

export enum VerificationType {
  RESIDENCE = 'Residence',
  OFFICE = 'Office',
  BUSINESS = 'Business',
  RESIDENCE_CUM_OFFICE = 'Residence-cum-office',
  BUILDER = 'Builder',
  NOC = 'NOC',
  CONNECTOR = 'DSA/DST & Connector',
  PROPERTY_APF = 'Property (APF)',
  PROPERTY_INDIVIDUAL = 'Property (Individual)',
}

export enum VerificationOutcome {
  POSITIVE = 'Positive',
  SHIFTED = 'Shifted',
  NSP = 'NSP',
  ENTRY_RESTRICTED = 'Entry Restricted',
  UNTRACEABLE = 'Untraceable',
}

// Common Form Field Types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number' | 'date' | 'checkbox' | 'radio' | 'file';
  value: any;
  options?: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface FormSubmission {
  id: string;
  caseId: string;
  formType: FormType;
  verificationType: VerificationType;
  outcome: VerificationOutcome;
  sections: FormSection[];
  attachments: FormAttachment[];
  location?: FormLocation;
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  reviewComments?: string;
}

export interface FormAttachment {
  id: string;
  name: string;
  type: 'photo' | 'document' | 'signature';
  url: string;
  size: number;
  mimeType: string;
  location?: FormLocation;
  capturedAt: string;
  description?: string;
}

export interface FormLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
  timestamp: string;
}

// Specific Form Data Types
export interface ResidenceFormData {
  // Personal Information
  applicantName: string;
  applicantAge?: number;
  applicantRelation: string;
  applicantContact?: string;
  
  // Address Information
  addressLocatable: string;
  addressRating: string;
  houseStatus: string;
  localityType: string;
  
  // Verification Details
  personMet: string;
  relationToApplicant: string;
  stayingStatus: string;
  workingStatus: string;
  documentShown: string;
  documentType?: string;
  
  // Third Party Confirmation
  tpcMetPerson?: string;
  tpcConfirmation?: string;
  
  // Area Information
  politicalConnection: string;
  dominatedArea: string;
  feedbackFromNeighbour: string;
  
  // Final Assessment
  finalStatus: string;
  remarks?: string;
  verifierComments?: string;
}

export interface OfficeFormData {
  // Company Information
  companyName: string;
  officeType: string;
  designation: string;
  
  // Address Information
  addressLocatable: string;
  addressRating: string;
  officeStatus: string;
  localityType: string;
  
  // Verification Details
  personMet: string;
  workingStatus: string;
  applicantWorkingPremises: string;
  
  // Third Party Confirmation
  tpcMetPerson?: string;
  tpcConfirmation?: string;
  
  // Area Information
  politicalConnection: string;
  dominatedArea: string;
  feedbackFromNeighbour: string;
  
  // Final Assessment
  finalStatus: string;
  remarks?: string;
  verifierComments?: string;
}

export interface BusinessFormData {
  // Business Information
  businessName: string;
  businessType: string;
  ownershipType: string;
  
  // Address Information
  addressLocatable: string;
  addressRating: string;
  businessStatus: string;
  premisesStatus: string;
  
  // Verification Details
  businessExistence: string;
  applicantExistence: string;
  
  // Area Information
  politicalConnection: string;
  dominatedArea: string;
  feedbackFromNeighbour: string;
  
  // Final Assessment
  finalStatus: string;
  remarks?: string;
  verifierComments?: string;
}

// Form Template Types
export interface FormTemplate {
  id: string;
  formType: FormType;
  verificationType: VerificationType;
  outcome: VerificationOutcome;
  name: string;
  description: string;
  sections: FormSectionTemplate[];
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormSectionTemplate {
  id: string;
  title: string;
  description?: string;
  order: number;
  fields: FormFieldTemplate[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  conditional?: FormCondition;
}

export interface FormFieldTemplate {
  id: string;
  label: string;
  type: FormField['type'];
  name: string;
  order: number;
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: { label: string; value: string }[];
  validation?: FormValidation;
  conditional?: FormCondition;
}

export interface FormValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: string;
}

export interface FormCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: any;
}

// Form Viewer Props
export interface FormViewerProps {
  submission: FormSubmission;
  template?: FormTemplate;
  readonly?: boolean;
  showAttachments?: boolean;
  showLocation?: boolean;
  showMetadata?: boolean;
  onFieldChange?: (fieldId: string, value: any) => void;
  onSectionToggle?: (sectionId: string, expanded: boolean) => void;
}
