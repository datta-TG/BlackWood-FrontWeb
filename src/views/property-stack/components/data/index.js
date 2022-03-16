export default {
  fields: [
    {
      table: 'property',
      tableName: 'Property',
      id: 2,
      key: 'folio',
      label: 'Folio',
      sortable: true,
      visible: true,
      active: true,
      date: false,
    },
    {
      table: 'property',
      tableName: 'Property',
      id: 3,
      key: 'address_full',
      label: 'Address Full',
      sortable: true,
      visible: true,
      active: true,
      date: false,
    },
    {
      table: 'property',
      tableName: 'Property',
      id: 4,
      key: 'city',
      label: 'City',
      sortable: true,
      visible: true,
      active: true,
      date: false,
    },
    {
      table: 'property',
      tableName: 'Property',
      id: 5,
      key: 'county',
      label: 'County',
      sortable: true,
      visible: true,
      active: true,
      date: false,
    },
    {
      table: 'property',
      tableName: 'Property',
      id: 6,
      key: 'zip',
      label: 'ZIP',
      sortable: true,
      visible: true,
      active: true,
      date: false,
    },
    {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 8,
      key: 'pfc_flag',
      label: 'PFCFlag',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 9,
      key: 'pfc_indicator',
      label: 'PFCIndicator',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 10,
      key: 'pfc_recording_date',
      label: 'PFCRecordingDate',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 11,
      key: 'auction_date_pfc',
      label: 'AuctionDate_PFC',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 12,
      key: 'pfc_type',
      label: 'PFCType',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    },
    {
      table: 'legal_master', tableName: 'Legal', id: 13, key: 'lot_code', label: 'LotCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 14, key: 'lot_nbr', label: 'LotNbr', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 15, key: 'block', label: 'Block', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 16, key: 'section', label: 'Section', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 17, key: 'district', label: 'District', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 18, key: 'subdivision_name', label: 'SubdivisionName', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 19, key: 'legal_description', label: 'LegalDescription', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'listing_master', tableName: 'Listing', id: 20, key: 'status_listing', label: 'Status_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 21, key: 'status_sub_type_listing', label: 'StatusSubType_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 22, key: 'rental_indicator_listing', label: 'RentalIndicator_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 23, key: 'current_listing_price_listing', label: 'CurrentListingPrice_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 24, key: 'sold_price_listing', label: 'SoldPrice_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 25, key: 'sold_date_listing', label: 'SoldDate_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 26, key: 'update_timestamp_listing', label: 'UpdateTimestamp_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 27, key: 'indicator_listing', label: 'Indicator_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 28, key: 'current_listing_ind_listing', label: 'CurrentListingInd_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 29, key: 'current_rental_ind_listing', label: 'CurrentRentalInd_LISTING', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'mortage_master', tableName: 'Mortage', id: 30, key: 'mtg1_recording_date', label: 'Mtg1RecordingDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 31, key: 'mtg1_loan_amt', label: 'Mtg1LoanAmt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 32, key: 'mtg1_loan_type', label: 'Mtg1LoanType', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 33, key: 'mtg2_recording_date', label: 'Mtg2RecordingDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 34, key: 'mtg2_loan_amt', label: 'Mtg2LoanAmt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 35, key: 'mtg2_loan_type', label: 'Mtg2LoanType', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 36, key: 'mtg1_est_loan_balance', label: 'Mtg1EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 37, key: 'mtg2_est_loan_balance', label: 'Mtg2EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 38, key: 'mtg3_est_loan_balance', label: 'Mtg3EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 39, key: 'mtg4_est_loan_balance', label: 'Mtg4EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'owner_master', tableName: 'Owner', id: 40, key: 'owner_corp_ind', label: 'owner_corp_ind', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 41, key: 'owner_name_full', label: 'owner_name_full', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 42, key: 'owner_type', label: 'owner_type', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 43, key: 'estate', label: 'estate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 44, key: 'lifeestate', label: 'lifeestate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 45, key: 'owner_corp', label: 'owner_corp', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 46, key: 'land_use_code', label: 'LandUseCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 47, key: 'county_land_use_code', label: 'CountyLandUseCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 48, key: 'lot_size_sqft', label: 'LotSizeSqFt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 49, key: 'sum_living_area_sqft', label: 'SumLivingAreaSqFt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 50, key: 'year_built', label: 'YearBuilt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 51, key: 'sum_residential_units', label: 'SumResidentialUnits', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'sales_master', tableName: 'Sales', id: 52, key: 'current_sale_recording_date', label: 'CurrentSaleRecordingDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 53, key: 'current_sale_contract_date', label: 'CurrentSaleContractDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 54, key: 'current_sales_price', label: 'CurrentSalesPrice', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 55, key: 'current_sales_pricecode', label: 'CurrentSalesPriceCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 56, key: 'current_sale_buyer_1_full_name', label: 'CurrentSaleBuyer1FullName', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 57, key: 'current_sale_buyer_2_full_name', label: 'CurrentSaleBuyer2FullName', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 58, key: 'sale_date', label: 'saleDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 59, key: 'diff_days', label: 'DiffDays', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 60, key: 'diff_prices', label: 'DiffPrices', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'situs_master', tableName: 'Situs', id: 61, key: 'fips', label: 'FIPS', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 62, key: 'situs_full_street_address', label: 'SitusFullStreetAddress', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 63, key: 'situs_street', label: 'SitusStreet', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 64, key: 'situs_unit_type', label: 'SitusUnitType', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 65, key: 'situs_city', label: 'SitusCity', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 66, key: 'situs_state', label: 'SitusState', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 67, key: 'situs_zip5', label: 'SitusZIP5', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 68, key: 'mailing_street', label: 'MailingStreet', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 69, key: 'mailing_city', label: 'MailingCity', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 70, key: 'mailing_state', label: 'MailingState', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 71, key: 'mailing_zip5', label: 'MailingZIP5', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 72, key: 'mailing_foreign_address_ind', label: 'MailingForeignAddressInd', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'tax_master', tableName: 'Tax', id: 73, key: 'market_total_value', label: 'MarketTotalValue', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'indicators_master', tableName: 'Indicators', id: 74, key: 'land_use_code', label: 'LandUseCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 75, key: 'veteran_ind', label: 'VeteranInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 76, key: 'timeshare_code', label: 'TimeshareCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 77, key: 'disabled_ind', label: 'DisabledInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 78, key: 'widow_ind', label: 'WidowInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 79, key: 'senior_ind', label: 'SeniorInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 80, key: 'homestead_ind_p', label: 'HomesteadIndP', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 81, key: 'ao_vs_hex', label: 'AOvsHEX', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 82, key: 'pfc_flag', label: 'PFCFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 83, key: 'on_auction', label: 'OnAuction', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 84, key: 'tax_flag', label: 'TaxFlag ', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 85, key: 'ff_deed_&_pfc_distress', label: 'FFDeed&PFCDistress', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 86, key: 'adverse_possesion', label: 'AdversePossesion', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 87, key: 'listing_failed', label: 'ListingFailed', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 88, key: 'no_loans', label: 'No_loans', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 89, key: 'absentee_owner', label: 'AbsenteeOwner', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 90, key: 'estate_1_or_2', label: 'Estate1or2', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 91, key: 'lifeestate_1_or_2', label: 'LifeEstate1or2', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 92, key: 'any_corp_ind_p', label: 'AnyCorpIndP', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 93, key: 'effective_year_built', label: 'X Update to year built', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 94, key: 'out_state_owner', label: 'OutStateOwner', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 95, key: 'out_of_county', label: 'OutOfCounty', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 96, key: 'no_sales', label: 'NoSales', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 97, key: 'long_time_sale', label: 'LongTimeSale', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 98, key: 'preforeclosure_flag', label: 'PreForeclosureFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 99, key: 'foreclosure_flag', label: 'ForeclosureFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 100, key: 'probate_flag', label: 'ProbateFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 101, key: 'eviction_flag', label: 'EvictionFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 102, key: 'delinquency_flag', label: 'DelinquencyFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 103, key: 'deceased_flag', label: 'DeceasedFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 104, key: 'bankrupcy_flag', label: 'BankrupcyFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 105, key: 'age_flag', label: 'AgeFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 106, key: 'golden_address', label: 'GoldenAddress', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 107, key: 'current_avm_value', label: 'CurrentAVMValue', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 108, key: 'ltv', label: 'LTV', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 109, key: 'high_equity', label: 'highEquity', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 110, key: 'flipped', label: 'Flipped', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 111, key: 'weighted_count', label: 'WeightedCount', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 112, key: 'core_count', label: 'CoreCount', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 113, key: 'phone_available', label: 'PhoneAvailable', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'probate', tableName: 'Probate', id: 114, key: 'probate', label: 'probate', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'eviction', tableName: 'Eviction', id: 116, key: 'eviction', label: 'eviction', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'foreclosure', tableName: 'Foreclosure', id: 118, key: 'foreclosure', label: 'foreclosure', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'tax_auction', tableName: 'Tax Auction', id: 120, key: 'tax auction', label: 'tax auction', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'tax_delinquency', tableName: 'Tax Delinquency', id: 122, key: 'tax delinquency', label: 'tax delinquency', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'call_history', tableName: 'Call History', id: 126, key: 'date', label: 'date', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'call_history', tableName: 'Call History', id: 127, key: 'customer_number', label: 'customer_number', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'call_history', tableName: 'Call History', id: 128, key: 'call_disposition', label: 'call_disposition', sortable: true, visible: true, active: false, date: false,
    },
    {
      id: 150,
      key: 'actions',
      label: '',
      visible: false,
      active: true,
    },
  ],
}
