# ledger app
==============
# run => npm install
# run => nodemon ./server.js

# request details
===================
# GET /ledgers?startDate={startDate}&endDate={endDate}&frequency={frequency}&weeklyAmount={weeklyAmount}&timezone={timezone}
# startDate - start date of the ledger(ex : 2020-03-28T12:00:00.000Z)
# endDate - end date of the ledger(ex : 2020-09-28T12:00:00.000Z)
# frequency - MONTHLY, FORTNIGHTLY, WEEKLY
# weeklyAmount - weekly lease amount
# timezone - timezone from TZ database name