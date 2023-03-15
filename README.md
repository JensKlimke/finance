# finance
The finance stack

### API
- [ ] Consistent api return strategy. Return {code: 200, payload: {...}} from api when successful and handle code correctly.
- [x] Remove all unnecessary information from API -> Calculate in app
- [ ] Change log and historical data for entries
- [x] Put reference in query and not in body of entry (e.g. order: account should be set as query parameter)
- [x] (Obsolete, no sub-data) When sub-data is loaded (e.g. orders for an account ID), set reference (account ID) in response on the level of page, results, ...
    - {results: Array, page: 1, limit: 100, totalPages: 1, totalResults: 73, reference: 0abcdef...}
    - Can be used to check if the data contains to the right reference

### Authentication
- [x] check for renew in time interval (store expire date for that?)
- [x] User Management
- [x] Password reset etc.
- [x] Profile
- [x] Only delete session cookie, when refresh token invalid

### Entries & Forms
- [x] Make sortable
- [x] Make filterable
- [x] Hard coded text to dictionary per entry page
- [x] Show loading state, when saving form
- [ ] Tags for entries

#### Contracts
- [ ] Statistics of contract on hover (e.g. relative amount of the contract per month and per year)
- [x] Update statistics, when contract is updated
- [ ] Tags to filter by tag (e.g. insurance, server, ...)
- [ ] Status and/or duration (e.g. stopped, ...)
- [ ] Textual cadence (monthly, quarterly, annually)
- [ ] Add contract term

### Transfers
- [x] Restructure transfers code

### Assets
- [ ] Balances should be requestable by date and account
- [ ] Charts: Legend with jsx
- [ ] Charts: Tooltips with year etc.
- [ ] Amount (to be shown in the right upper corner) is not calculate correctly, when the last balance update is set to today
