export default [
  {
    id: 1,
    key: 'id',
    label: 'Id',
    multiple: false,
    visible: true,
    active: true,
    update: false,
  },
  {
    id: 2,
    key: 'properties',
    label: 'Folios in DB',
    multiple: true,
    multiple_settings: {
      id: 'folio',
      value: 'folio',
    },
    visible: true,
    active: true,
    update: false,
  },
  {
    id: 3,
    key: 'working_properties',
    label: 'Wrong Folios',
    multiple: true,
    multiple_settings: {
      id: 'folio',
      value: 'folio',
    },
    visible: true,
    active: true,
    update: false,
  },
  {
    id: 4,
    key: 'case_number',
    label: 'Case Number',
    multiple: false,
    visible: true,
    active: true,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 5,
    key: 'cfn',
    label: 'CFN',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 6,
    key: 'date_filed',
    label: 'Date Filed',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: true,
  },
  {
    id: 7,
    key: 'sale_date',
    label: 'Sale Date',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: true,
  },
  {
    id: 8,
    key: 'add_date',
    label: 'Add Date',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: true,
  },
  {
    id: 9,
    key: 'auction_status',
    label: 'Auction Status',
    multiple: false,
    visible: true,
    active: true,
    update: true,
    select: false,
    date: false,

  },
  {
    id: 10,
    key: 'final_judgement',
    label: 'Final Judgement',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 11,
    key: 'assessed_value',
    label: 'Assessed Value',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 12,
    key: 'petitioner',
    label: 'Petitioner',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 13,
    key: 'property_owner',
    label: 'Property Owner',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 14,
    key: 'plaintiff',
    label: 'Plaintiff',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 15,
    key: 'certificate_holder_name',
    label: 'Certificate Holder Name',
    multiple: false,
    visible: true,
    active: false,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 16,
    key: 'fips',
    label: 'FIPS',
    multiple: false,
    visible: true,
    active: true,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 16,
    key: 'tag',
    label: 'Tag',
    multiple: false,
    visible: true,
    active: false,
    update: false,
    select: false,
    date: false,
  },
  {
    id: 17,
    key: 'reason',
    label: 'Reason',
    multiple: false,
    visible: true,
    active: true,
    update: true,
    select: false,
    date: false,
  },
  {
    id: 18,
    key: 'item_example',
    label: 'Sample',
    multiple: false,
    visible: true,
    active: false,
    update: false,
    date: false,
  },
  {
    id: 19,
    key: 'actions',
    label: '',
    multiple: false,
    visible: false,
    active: true,
    update: false,
  },
]
