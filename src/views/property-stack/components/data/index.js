export default {
  fields: [
    {
      table: 'property',
      tableName: 'Property',
      id: 2,
      key: 'Property.folio',
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
      key: 'Property.address_full',
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
      key: 'Property.city',
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
      key: 'Property.county',
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
      key: 'Property.zip',
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
      key: 'ForeclosureMaster.pfc_flag',
      label: 'PFCFlag',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 9,
      key: 'ForeclosureMaster.pfc_indicator',
      label: 'PFCIndicator',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 10,
      key: 'ForeclosureMaster.pfc_recording_date',
      label: 'PFCRecordingDate',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 11,
      key: 'ForeclosureMaster.auction_date_pfc',
      label: 'AuctionDate_PFC',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    }, {
      table: 'foreclosure_master',
      tableName: 'Foreclosure',
      id: 12,
      key: 'ForeclosureMaster.pfc_type',
      label: 'PFCType',
      sortable: true,
      visible: true,
      active: false,
      date: false,
    },
    {
      table: 'legal_master', tableName: 'Legal', id: 13, key: 'LegalMaster.lot_code', label: 'LotCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 14, key: 'LegalMaster.lot_nbr', label: 'LotNbr', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 15, key: 'LegalMaster.block', label: 'Block', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 16, key: 'LegalMaster.section', label: 'Section', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 17, key: 'LegalMaster.district', label: 'District', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 18, key: 'LegalMaster.subdivision_name', label: 'SubdivisionName', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'legal_master', tableName: 'Legal', id: 19, key: 'LegalMaster.legal_description', label: 'LegalDescription', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'listing_master', tableName: 'Listing', id: 20, key: 'ListingMaster.status_listing', label: 'Status_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 21, key: 'ListingMaster.status_sub_type_listing', label: 'StatusSubType_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 22, key: 'ListingMaster.rental_indicator_listing', label: 'RentalIndicator_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 23, key: 'ListingMaster.current_listing_price_listing', label: 'CurrentListingPrice_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 24, key: 'ListingMaster.sold_price_listing', label: 'SoldPrice_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 25, key: 'ListingMaster.sold_date_listing', label: 'SoldDate_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 26, key: 'ListingMaster.update_timestamp_listing', label: 'UpdateTimestamp_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 27, key: 'ListingMaster.indicator_listing', label: 'Indicator_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 28, key: 'ListingMaster.current_listing_ind_listing', label: 'CurrentListingInd_LISTING', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'listing_master', tableName: 'Listing', id: 29, key: 'ListingMaster.current_rental_ind_listing', label: 'CurrentRentalInd_LISTING', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'mortage_master', tableName: 'Mortage', id: 30, key: 'MortageMaster.mtg1_recording_date', label: 'Mtg1RecordingDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 31, key: 'MortageMaster.mtg1_loan_amt', label: 'Mtg1LoanAmt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 32, key: 'MortageMaster.mtg1_loan_type', label: 'Mtg1LoanType', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 33, key: 'MortageMaster.mtg2_recording_date', label: 'Mtg2RecordingDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 34, key: 'MortageMaster.mtg2_loan_amt', label: 'Mtg2LoanAmt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 35, key: 'MortageMaster.mtg2_loan_type', label: 'Mtg2LoanType', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 36, key: 'MortageMaster.mtg1_est_loan_balance', label: 'Mtg1EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 37, key: 'MortageMaster.mtg2_est_loan_balance', label: 'Mtg2EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 38, key: 'MortageMaster.mtg3_est_loan_balance', label: 'Mtg3EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'mortage_master', tableName: 'Mortage', id: 39, key: 'MortageMaster.mtg4_est_loan_balance', label: 'Mtg4EstLoanBalance', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'owner_master', tableName: 'Owner', id: 40, key: 'OwnerMaster.owner_corp_ind', label: 'owner_corp_ind', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 41, key: 'OwnerMaster.owner_name_full', label: 'owner_name_full', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 42, key: 'OwnerMaster.owner_type', label: 'owner_type', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 43, key: 'OwnerMaster.estate', label: 'estate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 44, key: 'OwnerMaster.lifeestate', label: 'lifeestate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'owner_master', tableName: 'Owner', id: 45, key: 'OwnerMaster.owner_corp', label: 'owner_corp', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 46, key: 'PropertyCharacteristicsMaster.land_use_code', label: 'LandUseCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 47, key: 'PropertyCharacteristicsMaster.county_land_use_code', label: 'CountyLandUseCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 48, key: 'PropertyCharacteristicsMaster.lot_size_sqft', label: 'LotSizeSqFt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 49, key: 'PropertyCharacteristicsMaster.sum_living_area_sqft', label: 'SumLivingAreaSqFt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 50, key: 'PropertyCharacteristicsMaster.year_built', label: 'YearBuilt', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'property_characteristics_master', tableName: 'Property Characteristics', id: 51, key: 'PropertyCharacteristicsMaster.sum_residential_units', label: 'SumResidentialUnits', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'sales_master', tableName: 'Sales', id: 52, key: 'SalesMaster.current_sale_recording_date', label: 'CurrentSaleRecordingDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 53, key: 'SalesMaster.current_sale_contract_date', label: 'CurrentSaleContractDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 54, key: 'SalesMaster.current_sales_price', label: 'CurrentSalesPrice', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 55, key: 'SalesMaster.current_sales_pricecode', label: 'CurrentSalesPriceCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 56, key: 'SalesMaster.current_sale_buyer_1_full_name', label: 'CurrentSaleBuyer1FullName', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 57, key: 'SalesMaster.current_sale_buyer_2_full_name', label: 'CurrentSaleBuyer2FullName', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 58, key: 'SalesMaster.SalesMaster.sale_date', label: 'saleDate', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 59, key: 'SalesMaster.diff_days', label: 'DiffDays', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'sales_master', tableName: 'Sales', id: 60, key: 'SalesMaster.diff_prices', label: 'DiffPrices', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'situs_master', tableName: 'Situs', id: 61, key: 'SitusMaster.fips', label: 'FIPS', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 62, key: 'SitusMaster.situs_full_street_address', label: 'SitusFullStreetAddress', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 63, key: 'SitusMaster.situs_street', label: 'SitusStreet', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 64, key: 'SitusMaster.situs_unit_type', label: 'SitusUnitType', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 65, key: 'SitusMaster.situs_city', label: 'SitusCity', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 66, key: 'SitusMaster.situs_state', label: 'SitusState', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 67, key: 'SitusMaster.situs_zip5', label: 'SitusZIP5', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 68, key: 'SitusMaster.mailing_street', label: 'MailingStreet', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 69, key: 'SitusMaster.mailing_city', label: 'MailingCity', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 70, key: 'SitusMaster.mailing_state', label: 'MailingState', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 71, key: 'SitusMaster.mailing_zip5', label: 'MailingZIP5', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'situs_master', tableName: 'Situs', id: 72, key: 'SitusMaster.mailing_foreign_address_ind', label: 'MailingForeignAddressInd', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'tax_master', tableName: 'Tax', id: 73, key: 'TaxMaster.market_total_value', label: 'MarketTotalValue', sortable: true, visible: true, active: false, date: false,
    },
    {
      table: 'indicators_master', tableName: 'Indicators', id: 74, key: 'IndicatorsMaster.land_use_code', label: 'LandUseCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 75, key: 'IndicatorsMaster.veteran_ind', label: 'VeteranInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 76, key: 'IndicatorsMaster.timeshare_code', label: 'TimeshareCode', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 77, key: 'IndicatorsMaster.disabled_ind', label: 'DisabledInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 78, key: 'IndicatorsMaster.widow_ind', label: 'WidowInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 79, key: 'IndicatorsMaster.senior_ind', label: 'SeniorInd', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 80, key: 'IndicatorsMaster.homestead_ind_p', label: 'HomesteadIndP', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 81, key: 'IndicatorsMaster.ao_vs_hex', label: 'AOvsHEX', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 82, key: 'IndicatorsMaster.pfc_flag', label: 'PFCFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 83, key: 'IndicatorsMaster.on_auction', label: 'OnAuction', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 84, key: 'IndicatorsMaster.tax_flag', label: 'TaxFlag ', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 85, key: 'IndicatorsMaster.ff_deed_&_pfc_distress', label: 'FFDeed&PFCDistress', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 86, key: 'IndicatorsMaster.adverse_possesion', label: 'AdversePossesion', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 87, key: 'IndicatorsMaster.listing_failed', label: 'ListingFailed', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 88, key: 'IndicatorsMaster.no_loans', label: 'No_loans', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 89, key: 'IndicatorsMaster.absentee_owner', label: 'AbsenteeOwner', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 90, key: 'IndicatorsMaster.estate_1_or_2', label: 'Estate1or2', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 91, key: 'IndicatorsMaster.lifeestate_1_or_2', label: 'LifeEstate1or2', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 92, key: 'IndicatorsMaster.any_corp_ind_p', label: 'AnyCorpIndP', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 93, key: 'IndicatorsMaster.effective_year_built', label: 'X Update to year built', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 94, key: 'IndicatorsMaster.out_state_owner', label: 'OutStateOwner', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 95, key: 'IndicatorsMaster.out_of_county', label: 'OutOfCounty', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 96, key: 'IndicatorsMaster.no_sales', label: 'NoSales', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 97, key: 'IndicatorsMaster.long_time_sale', label: 'LongTimeSale', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 98, key: 'IndicatorsMaster.preforeclosure_flag', label: 'PreForeclosureFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 99, key: 'IndicatorsMaster.foreclosure_flag', label: 'ForeclosureFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 100, key: 'IndicatorsMaster.probate_flag', label: 'ProbateFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 101, key: 'IndicatorsMaster.eviction_flag', label: 'EvictionFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 102, key: 'IndicatorsMaster.delinquency_flag', label: 'DelinquencyFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 103, key: 'IndicatorsMaster.deceased_flag', label: 'DeceasedFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 104, key: 'IndicatorsMaster.bankrupcy_flag', label: 'BankrupcyFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 105, key: 'IndicatorsMaster.age_flag', label: 'AgeFlag', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 106, key: 'IndicatorsMaster.golden_address', label: 'GoldenAddress', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 107, key: 'IndicatorsMaster.current_avm_value', label: 'CurrentAVMValue', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 108, key: 'IndicatorsMaster.ltv', label: 'LTV', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 109, key: 'IndicatorsMaster.high_equity', label: 'highEquity', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 110, key: 'IndicatorsMaster.flipped', label: 'Flipped', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 111, key: 'IndicatorsMaster.weighted_count', label: 'WeightedCount', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 112, key: 'IndicatorsMaster.core_count', label: 'CoreCount', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'indicators_master', tableName: 'Indicators', id: 113, key: 'IndicatorsMaster.phone_available', label: 'PhoneAvailable', sortable: true, visible: true, active: false, date: false,
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
      table: 'call_history', tableName: 'Call History', id: 126, key: 'CallHistory.date', label: 'date', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'call_history', tableName: 'Call History', id: 127, key: 'CallHistory.customer_number', label: 'customer_number', sortable: true, visible: true, active: false, date: false,
    }, {
      table: 'call_history', tableName: 'Call History', id: 128, key: 'CallHistory.call_disposition', label: 'call_disposition', sortable: true, visible: true, active: false, date: false,
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
