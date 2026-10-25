// endur-kb.js
// Voxera knowledge bank (data only). Generated from your prep files:
// own answers + notes, mock interview guide, JVS quiz, JVS examples,
// NBP/Settlement Desktop cheat sheet, Endur managers workbook, flashcards,
// AVS->JVS notes, generic reference answers.
// Fields: s = source, o = 1 if it is YOUR OWN answer/notes, q = question/title, a = content.
// To add your own Q&A later, copy an entry and set o: 1.
window.VOXERA_KB = [
{
"s": "Own answer (spoken style)",
"o": 1,
"q": "Tell me about yourself / walk me through your Endur experience (detailed)",
"a": "I have total 18 years of IT experience, in which I have worked around 7 years on the Endur ETRM platform as an Endur developer and also as an Endur consultant, and my experience is predominantly in Power and Gas trading.\nIn my current engagement I have been involved in development and support activities. On the development side I have been predominantly involved in back-office and settlement-related development, where I have implemented various custom AVS and JVS scripts for trade processing, settlement data loading, generation, output processing and automation.\nI also have hands-on experience with Endur static and reference data, including Parties, Business Units, Legal Entities, Party Agreements and Settlement Instructions.\nI also have experience in EOD, simulations and cubes. I've worked on long-running EOD processes, performance optimisation, reconciliation and production support. As part of one optimisation initiative, I was involved in reducing the overnight batch processing time by around 38%.\nIn my past experience I was involved in an Endur version upgrade from v14 to v19, where I contributed mainly to AVS-to-JVS script conversion, covering regression testing and custom-code validation.\nI have been part of a greenfield Endur implementation, mainly focusing on the back-office side, including settlements, confirmations, invoicing and post-operation audit processes. I've also worked on credit exposure reporting and operational automation.\nIn previous roles I've been involved in both development and production support, across the Endur trade lifecycle, from trade capture and validation through position, valuation, risk, operations, settlements and invoicing.\nOn the integration and market-data side, I've worked on Zema price loads, MorningStar pricing and ABB nMarket synchronisation with Market Manager. I also use SQL extensively for troubleshooting and reconciliation, and I've been involved in an Oracle-to-Databricks migration.\nAlongside development, I've been part of BAU and L2/L3 production support, working with traders, risk, operations and back-office teams to analyse issues, identify root causes, implement fixes and validate them before deployment.\nSo overall, my core experience is around Endur development, trade lifecycle, JVS/AVS, EOD and simulations, back office, integrations, upgrades and production support, mainly across gas and power trading."
},
{
"s": "Own answer (spoken style)",
"o": 1,
"q": "How do you handle a requirement? Business asks you to develop something new — what is your process?",
"a": "First, the requirement comes in a functional document. Based on the functional document, I create the technical design document.\nI start with the user tables needed for the new requirement, and then update those tables with the required static data.\nThen I write the script for that functionality and create a task for the script.\nThen, based on whether the task is automated or manually executed: if it's an automated script, I go into the workflow management tab in Services Manager and schedule the script as per the need.\nBefore scheduling, I check the other existing scripts and any dependent scripts for overlaps and impacts, and I also discuss it with the business. If it's an EOD-related task, I discuss its implications on the existing scripts in detail before scheduling anything.\nIf any email has to be triggered, for example a confirmation to be sent to the counterparty, I make the email function call, and if I need to add or update recipients, I update the relevant email tables."
},
{
"s": "Own answer (spoken style)",
"o": 1,
"q": "Example: external deal reference daily price validation task",
"a": "With the external_deal_reference, we noticed the price was not getting correctly updated. We were asked to create a task to validate daily the deals we are receiving, using their external reference number, and compare them with the deal captured in Endur. This is to make sure the deals are processing daily without pricing issues or a mismatch between the input and the actual data processed."
},
{
"s": "Own notes",
"o": 1,
"q": "Product / delivery attributes: peak or off-peak, gas pipeline zone and location",
"a": "Product and delivery information on a deal: for power, product info such as peak or off-peak; for gas, the pipeline, zone, location and similar delivery attributes."
},
{
"s": "Own answer (short intro)",
"o": 1,
"q": "Tell me about yourself (short form) / introduce yourself",
"a": "I have 18 years of IT experience, including around 7 years on the Endur ETRM platform as both an Endur Developer and Consultant, predominantly in Power and Gas trading.\n\nIn my current engagement, I handle both development and support. On the development side, I focus on back-office and settlements, building custom AVS and JVS scripts for trade processing, settlement data loading, document generation, output processing, and automation, along with managing static and reference data such as Parties, Business Units, Legal Entities, Party Agreements, and Settlement Instructions.\n\nEarlier in my career, I worked across the full Endur trade lifecycle, from trade capture and validation through position, valuation, risk, operations, settlements, and invoicing.\n\nOn the EOD side, I have worked with simulations and cubes, long-running EOD processes, and performance optimization. In one initiative, I helped reduce overnight batch processing time by around 38%.\n\nFor integrations and market data, I have worked on Zema price loads, MorningStar pricing, and ABB nMarket synchronization with Market Manager. I use SQL extensively for troubleshooting and reconciliation, and was involved in an Oracle-to-Databricks migration.\n\nI was part of an Endur upgrade from V14 to V19, where I contributed significantly to AVS-to-JVS conversion, regression testing, and custom-code validation.\n\nI was also part of a greenfield Endur implementation focused on the back office, covering settlements, confirmations, invoicing, and post-operation audit, as well as credit exposure reporting.\n\nAlongside development, I provide BAU and L2/L3 production support, working with traders, risk, operations, and back-office teams to analyse issues, find root causes, and implement and validate fixes before deployment.\n\nOverall, I bring end-to-end Endur experience across development, back office, EOD, integrations, and support in Gas and Power trading."
},
{
"s": "Own notes: Settlement Desktop",
"o": 1,
"q": "The settlement Desktop contains definitions , views and events",
"a": "The settlement Desktop contains definitions , views and events\nthe events are grouped based on the grouping criteria that has been set in the settlement desktop setup\nEach defintion is assocaited wtih a defintion.Each definition can have one or multiple views which can be configured by filtering with some criteria in the back end of each view which can be done through the settlement setup\nThe settlement desktop uses the 3 scripts majorly dataload script, generation/module script , output script\nThe dataload script will be executed to load the data under the each defnition when we click on it.\nThe generation script will move the document from one\nThe document templates can be edited using the service called DMS Document Editor\nonce settlement is moved from new to draft status the document number will be created in the settlement desktop A record will be created into the table stldoc_header\nonce Document Created or Invoice Created the data will be entered into the table stldoc __details and stldoc_header tables."
},
{
"s": "Own notes: Settlement Desktop",
"o": 1,
"q": "This table only will contain the high level details of the settlements ,the stldoc_details contains more details at low",
"a": "This table only will contain the high level details of the settlements ,the stldoc_details contains more details at low leve.\nThe settlement setup menu contains the items like views definitions templates output forms module sets and actual modules also document types documents status each of this will have a table associated in the database whose names are as follows stldoc_document_types,stldoc_document_status ,stldoc_definitions ,stldoc_templates,stldoc_output_forms,stldoc_module_set,stldoc_info_types\nTo search for something like *string we have to use forward slash in place of * as follows \"/string\"\na pre-process (OPS) script calls Util.exitFail(), or Endur's own validation rejects the deal. The deal is then not saved as Validated. The whole processing step is rolled back, so no events are generated for that attempt.\nValidation succeeds: the deal is committed as Validated, and the ab_tran_event rows are created as part of that same save."
},
{
"s": "Own notes: trade flow",
"o": 1,
"q": "Trade flow from web trader into Endur; what is checked during deal validation",
"a": "so the flow is somethig like\n\nfor every few mins the the endur system receives the trades from web trader interface. in that list ,endur reads each deal and captures into the endur syste, follows the typical life cycle (validation ,send confirmation to cp, market risks and position risks monitoring,initiation of delivery and logistics, settlement and invoice) till its settlement. \n\nwhile deal validation in progress it checks the completness and data accuracy ,cp credit checks and BU/LE checks and trader authorization(internal BU)"
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Introduce yourself and explain your Endur experience.",
"a": "I have worked as an Endur developer and consultant, mainly across gas and power trading. My core areas are JVS and AVS development, back-office processing, EOD, integrations, upgrades and production support. In my current engagement, my focus has been on back-office development and support within a greenfield implementation."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What do you personally deliver in your current engagement?",
"a": "I have worked on static-data scripts, automated confirmations and invoicing, a post-operations invoice audit script and credit exposure reporting. I have also investigated data-load, generation and output issues during testing and supported UAT and go-live."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "You mention the full lifecycle. Are you equally strong in every area?",
"a": "My strongest hands-on areas are development, back office, EOD and production support. I understand how trade capture, valuation and risk connect to those processes, but I would distinguish that understanding from owning every front-office configuration."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "Your introduction says seven years of Endur, but your CV says eight plus. Which is correct?",
"a": "I need to reconcile the dates and distinguish core Endur delivery from the Endur DevOps period. I would give one accurate figure consistently. I would also confirm my total IT experience against my full employment history."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "Which achievement can you explain in detail without relying on the CV wording?",
"a": "I can discuss the v14-to-v19 upgrade, where my work included AVS-to-JVS conversion, EOD execution and cube reconciliation. I would explain the exact script or reconciliation example I personally handled, including the issue, change and validation."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The business requests a new daily validation. How do you handle it?",
"a": "First, I clarify the business problem, data sources, expected output and acceptance criteria. Based on the functional requirement, I prepare the technical design and review dependencies. Then I develop, test, support UAT and follow the release process before scheduling and monitoring the task."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Do you always start by creating a user table?",
"a": "No. First, I check whether existing configuration or supported functionality meets the requirement. I use a user table only where we need additional configuration, staging or audit information, with clear keys and ownership."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The functional document is incomplete. Do you start coding?",
"a": "I would clarify the missing business rules with the analyst and business users. I can investigate the existing flow in parallel, but I would record assumptions and agree the critical acceptance criteria before implementing behaviour that affects trades or settlements."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The business wants the task at 6 pm, but the source arrives later. What do you do?",
"a": "I explain the dependency and agree whether the task should wait, retry within a defined window or raise an exception. A fixed schedule alone is not enough. I also check overlap with existing processing and the business deadline."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What should your technical design contain?",
"a": "I include the processing flow, source and target data, mapping, configuration, validation rules, error handling, restart behaviour, dependencies and test approach. I also cover deployment, monitoring and recovery so support can operate the solution."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How would you build daily pricing validation using external deal references?",
"a": "I would agree the matching key and compare the incoming records with the appropriate Endur trade version. Before comparing prices, I would align currency, unit, delivery period and price meaning. I would report missing trades, ambiguous matches and price differences separately."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The external price is 50, Endur is 55, and the trader says 55 is corrected. What now?",
"a": "I would check the amendment history and confirm the agreed price using the relevant business record. I would also check whether the external message is older. My script would flag the mismatch until the source-of-truth and amendment rules establish which value is valid."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Would your script automatically overwrite the Endur price?",
"a": "Only if the business has explicitly agreed the owning system, update rules and approval controls. A mismatch alone is not enough. Otherwise, I would report the exception with enough detail for investigation."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The same external reference appears twice. Which record wins?",
"a": "I would not assume the last record is correct. I would check whether these are duplicate messages, valid amendments, separate legs or a reference reused across sources. The agreed business key and version rules determine processing; unresolved ambiguity goes to an exception queue."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What would you record for audit and reruns?",
"a": "I would record the source, reference, message or version identifier, Endur identifier, compared values, timestamps and outcome. I would design reruns so the same input does not create duplicate actions or repeated notifications without a clear reason."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What is the difference between AVS and JVS?",
"a": "AVS is Endur's proprietary scripting language. JVS uses Java with OpenJVS APIs to work with Endur. In my experience, the main consideration is preserving the business logic while handling the Java structure, supported APIs and resource lifecycle correctly."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How do you handle temporary tables in a JVS script?",
"a": "I distinguish tables I create from tables supplied by the framework. I release resources I own through reliable cleanup, including failure paths. I avoid destroying framework-owned objects unless the API contract requires it, and I check the installed SDK guidance."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Why is catching an exception and logging it not enough?",
"a": "If I suppress the exception, the workflow may show success even though processing failed. I log the context and make sure the task exposes the correct failure status. I also distinguish a recoverable record-level problem from an error that should stop the whole batch."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "A script works for ten trades but fails for ten thousand. What do you inspect?",
"a": "I check memory and temporary resources, repeated API or database calls inside loops, query volume, input size and timeout behaviour. I measure where the time or memory goes, then test the change with realistic data volumes."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What do useful logs contain?",
"a": "I include the run identifier, processing step, business date, relevant record identifiers, counts, elapsed time and error context. I avoid credentials and unnecessary sensitive data. The logs should help support identify what failed and whether a rerun is safe."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Explain settlement and invoicing and where data-load, generation and output scripts fit.",
"a": "At a high level, settlement processing establishes the payable or receivable amounts from eligible trade events. Invoicing groups and presents those amounts under the configured rules. In a customised document flow, data-load retrieves the required data, generation builds the document content, and output handles its configured delivery or export."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The invoice exists, but the counterparty has not received it. Where do you start?",
"a": "I check the document and output status, the generated content, recipient configuration and delivery logs. I establish whether output was attempted and accepted. I would not regenerate the invoice immediately because the issue may only be in delivery."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The output task succeeded. Does that prove the email reached the counterparty?",
"a": "No. It may only show that the output step completed or handed the message to another service. I would check the configured delivery acknowledgement and any failure or bounce information before confirming receipt."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The invoice amount is wrong. What do you check before changing the script?",
"a": "I check the underlying events, quantity, price, delivery period, currency, units, amendments and applicable business rules. I trace the values through the input and generated document to find the first point where they differ."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "What did your post-operations invoice audit script validate?",
"a": "In my current engagement, I built a post-operations script to audit invoice information against a user table. It compared the invoice information with the configured reference data and identified discrepancies. For the detailed walkthrough, I need to confirm the exact fields and processing rules used in that script."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What is the difference between static data and market data?",
"a": "Static data defines the business setup, such as parties, business units, legal entities and settlement instructions. Market data includes changing inputs such as prices, forward curves and FX rates used in pricing and valuation. Static data can change too, but usually through controlled maintenance."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What is the difference between a business unit and a legal entity?",
"a": "The legal entity represents the company carrying the contractual obligations. A business unit represents an operational or trading unit associated with that entity. I check the configured party relationships because incorrect mapping can affect trade processing and documents."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What are settlement instructions used for?",
"a": "They define the payment details applicable to settlement, such as the relevant account, currency and payment method. I check that the correct instructions are selected for the party and transaction context, rather than assuming one account applies to every payment."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "A trade is booked under the wrong counterparty business unit. Would you just edit it?",
"a": "I would check the associated legal entity, trade status and downstream confirmations, settlements and risk impact first. Then I would follow the approved correction process with the business. Changing the party can have wider effects than correcting a display field."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How would you make a static-data creation script safe to rerun?",
"a": "I would use agreed business keys, check for existing records and apply controlled create or update rules. I would validate dependencies and log the outcome. The same input should not silently create duplicate parties or settlement instructions."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What is the difference between trade date and delivery period?",
"a": "The trade date is when we agree the deal. The delivery period is when the gas or power is supplied, or the period referenced by the contract. For example, we can agree a trade today for delivery throughout next month."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What is the difference between peak and off-peak power?",
"a": "Peak covers the delivery hours defined as peak under the relevant market and contract. Off-peak covers the corresponding non-peak hours for that product. I check the actual calendar, weekends and holidays instead of assuming one universal schedule."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What is the difference between a physical and a financial trade?",
"a": "A physical trade includes a delivery obligation for the commodity. A financial trade settles a financial payoff under the contract without requiring that commodity delivery. Both can create market exposure, and the operational and settlement requirements differ."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "A power trade has the correct MW but the wrong settlement quantity. Why?",
"a": "MW is power, while MWh is energy. I would check the delivery intervals, applicable hours and profile. For a constant 10 MW over 24 one-hour intervals, the energy is 240 MWh. I would also check daylight-saving changes and market conventions."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What additional details matter for a physical gas trade?",
"a": "I would check the delivery location or hub, pipeline or zone where relevant, gas-day convention, quantity and unit, delivery schedule and pricing terms. Nominations and actual quantities may also matter, depending on the product and our operational responsibilities."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "An EOD task fails overnight. What do you do first?",
"a": "I check the failed step, error, business date, scope and downstream impact. I establish whether it is a data, application or infrastructure issue and whether processing partially completed. Then I follow the recovery procedure and communicate the impact and next update."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Why not rerun the entire EOD immediately?",
"a": "Some steps may already have written results, sent files or generated documents. A full rerun can duplicate actions or overwrite useful evidence. I identify the safe restart point and dependencies before deciding what needs to run again."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The failed task now succeeds. Is the incident resolved?",
"a": "Not necessarily. I verify the expected portfolios, outputs and downstream tasks, and check that no partial or duplicate results remain. I also confirm that users have the correct business-date results before closing the incident."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Two independent portfolios can run in parallel. What might still stop you?",
"a": "I check shared database or file resources, capacity, locks and downstream aggregation. The workloads may be logically independent but still compete for the same resource. I would compare end-to-end completion time under a controlled parallel run."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What information do you give the business during an EOD incident?",
"a": "I explain the affected outputs and desks, what remains available, the recovery action and the next update time. I distinguish a confirmed recovery estimate from an investigation in progress, rather than promising an unsupported completion time."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What was your contribution to the 38 percent batch improvement?",
"a": "I contributed to analysing long-running Endur EOD tasks and improving portfolio processing. The wider initiative used Azure-hosted containerised services to remove a single-server bottleneck. I would separate my Endur analysis and validation work from the infrastructure work owned by other team members."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "What exactly ran in the containers?",
"a": "I would identify the actual supporting services and explain how they interacted with Endur. I need to confirm those component names from the project. The CV does not establish that the Endur application or its simulation engines were containerised."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "How was the 38 percent measured?",
"a": "I would compare the same agreed batch start and finish points over representative runs with comparable workloads. The calculation is the old duration minus the new duration, divided by the old duration. I need to confirm the actual baseline and measurement period before quoting them."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Processing is faster, but one portfolio is missing. Is that an improvement?",
"a": "No. The run is incomplete. I would check portfolio coverage, failed or skipped tasks and aggregation before accepting the result. Performance improvement only counts when the required outputs and controls still pass."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What evidence would support your claim?",
"a": "The before-and-after run logs, workload scope, configuration changes and reconciliation results would support it. I would also explain my specific changes and who approved them. I would not invent original and final runtimes just to fit the percentage."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What have you done with simulations and cubes?",
"a": "I have worked on EOD simulations, cube modification and building, and reconciliation during the version upgrade. My focus has been execution, investigating differences and making sure the required results are available for downstream use."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "A simulation completes but a report is wrong. What do you inspect?",
"a": "I check the business date, trade population, market-data snapshot, simulation configuration and selected result set. Then I trace the report filters and aggregation. A completed simulation can still be the wrong run for the report."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The total valuation matches across versions. Is that enough?",
"a": "No. Offsetting differences can hide problems. I would compare the agreed result measures at portfolio and trade level, and at a finer level where needed. I also check missing records, duplicates, currencies and accepted tolerances."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Only one portfolio has different results after the upgrade. Where do you start?",
"a": "I isolate its trades, products and pricing configuration, then compare inputs and result measures with the baseline. I look for a common feature among the differences before assuming that the whole simulation engine is wrong."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How is a cube different from running a simulation?",
"a": "At a practical level, simulation processing produces valuation or risk results. A cube organises results for analysis across configured dimensions and measures. The exact construction and refresh process depends on the implementation, so I would explain the setup I actually supported."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How did you approach AVS-to-JVS conversion in the upgrade?",
"a": "My involvement covered AVS-to-JVS conversion, custom-code validation, EOD execution and cube reconciliation. For each script, I would first understand the existing business behaviour and dependencies, then convert and validate the output rather than treating compilation as the finish point."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Why is line-by-line translation not enough?",
"a": "Java structure, data types, supported APIs and resource handling require review. Also, a script can compile while producing different business results. I would validate normal cases, empty inputs, amendments and failure paths as relevant to that script."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The converted script gives a different result. How do you identify the cause?",
"a": "I hold the inputs constant and compare intermediate processing steps. I separate the converted logic from configuration and platform changes. Where practical, I test a smaller representative case so I can identify the first divergence."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "All unit tests pass, but the EOD workflow fails. Why could that happen?",
"a": "The script may depend on scheduling, configuration, upstream outputs, permissions or larger data volumes not represented in the unit tests. I would reproduce it in the workflow and inspect the actual runtime inputs and dependencies."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Your CV says zero critical go-live incidents. What does that prove?",
"a": "It describes the recorded go-live outcome for that project scope. It does not mean there were no defects or that I alone delivered the upgrade. I would explain my contribution, the acceptance process and the agreed incident severity definitions."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Zema loading succeeded, but the prices are wrong. How do you investigate?",
"a": "I compare the received source values with Endur for the affected dates and curves. I check mapping, currency, units, delivery periods and transformations, then inspect skipped records and possible later overwrites. I also assess whether the incorrect values reached valuations or EOD."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What if the price is numerically correct but attached to the wrong date?",
"a": "I inspect the source date meaning, delivery-date mapping, timezone and business-date handling. I distinguish publication date, observation date and delivery period. The correct number on the wrong curve point is still incorrect market data."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "You worked on MorningStar. How did you manage decryption?",
"a": "I worked on a service that received encrypted prices from MorningStar and published the decrypted values through Market Manager. I need to confirm the exact encryption and key-management mechanism before describing those details. Operationally, I would check retrieval, decryption, validation and publication separately when investigating a failure."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Endur and nMarket keep overwriting each other's prices. What is missing?",
"a": "The ownership and update rules may be unclear. I would confirm the actual integration direction, source priority, timestamp or version rules and loop prevention. Each field or feed needs an agreed authoritative source rather than uncontrolled two-way updates."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How would you recover from a partially processed price file?",
"a": "I identify which records were committed and which failed, preserve the source and run details, and use the supported reload mechanism. I would validate duplicate handling and reconcile the affected curve points before releasing downstream processing."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How do you use SQL in Endur support?",
"a": "I use SQL to investigate trade, pricing and settlement issues and reconcile expected versus actual records. I start with the business key, version and status rules. I prefer targeted read-only investigation and use supported application mechanisms for business-data changes."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How would you find external references with multiple records?",
"a": "I would group by the agreed source and reference key and check counts greater than one. Then I would inspect versions, legs and statuses. Multiple rows are only a potential duplicate until we understand the data model and expected uniqueness."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Your join doubled the invoice total. What happened?",
"a": "I would check the join cardinality. An invoice can have multiple lines, and another table may also have multiple matching rows. I establish the reporting grain and aggregate or restrict the join correctly. Adding DISTINCT without understanding the cause can hide errors."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What was your role in Oracle-to-Databricks migration?",
"a": "I was involved in migrating the data warehouse from Oracle to Databricks. My contribution included data-movement flowcharts, EOD impact analysis to identify affected tasks, and SQL changes related to retiring dimension tables. My involvement was focused on the downstream data flow and Endur dependencies."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How would you validate the migrated warehouse data?",
"a": "I compare aligned snapshots, keys, row counts and business aggregates, then inspect record-level differences. I check null handling, precision, timestamps and transformed fields. Matching counts alone does not prove the values or relationships are correct."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "Tell me about the credit exposure report you built.",
"a": "In my current engagement, I built a credit exposure report based on the agreed business requirement. My role was on the development side, translating the reporting requirement into the output. I need to confirm the exact exposure measure, grouping and source fields before giving a detailed implementation example."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Is credit exposure the same as mark-to-market?",
"a": "No. Mark-to-market is a valuation measure. Credit exposure depends on the agreed methodology and can include current exposure and other components, with netting or collateral treatment where applicable. I would confirm the report definition rather than use the terms interchangeably."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Can you net every trade with the same counterparty name?",
"a": "No. I need the correct legal entity, agreement and approved netting rules. Similar display names do not establish a legal right to net. I would use the grouping and treatment approved by the credit team."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The exposure report suddenly doubles overnight. What do you check?",
"a": "I check the run date, trade population, market moves, FX rates, source-result selection and duplicate joins. Then I review amendments and changes to netting or collateral inputs if those are included. I compare detailed records before assuming the risk itself doubled."
},
{
"s": "Mock guide COACHING NOTE (not a spoken answer; real detail still to be filled in)",
"o": 0,
"q": "Which report fields and source tables did you use?",
"a": "I would give the actual fields and approved data sources from the implementation. I need to confirm the exact schema names. I would not guess them because a confident but incorrect table name is easy to challenge."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "A trader reports an incorrect valuation before a deadline. What do you do?",
"a": "I confirm the affected trade, expected value, business date and urgency. I compare trade economics, market data and valuation inputs, and check the scope. I keep the trader updated while isolating whether the issue is data, configuration, code or expected behaviour."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What distinguishes your L2 and L3 work?",
"a": "The exact split varies by team. In my work, it includes investigating business incidents, analysing data and logs, identifying root causes, and developing or coordinating permanent fixes. I explain the responsibility I actually took rather than relying only on the support label."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "The business asks for a direct database update. Would you do it?",
"a": "I would establish the root cause and use the approved correction route. Direct changes to core business data can bypass application rules and audit behaviour. If an exceptional database change is required, it needs the organisation's controlled procedure, validation and recovery plan."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "You suspect an ION product defect. What do you send support?",
"a": "I provide the version and relevant build, business impact, reproducible steps, expected and actual behaviour, logs and a minimal example where possible. I remove unnecessary sensitive information and track the case, workaround and fix validation."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How do you prevent a resolved incident recurring?",
"a": "I record the cause and implement the appropriate permanent fix, validation or alert. I update the runbook and knowledge transfer where needed. I also verify the fix under the conditions that caused the issue, rather than closing it after one successful rerun."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How did you contribute to Endur CI/CD?",
"a": "In my Endur DevOps role, I worked on build, packaging and deployment of JVS or OpenJVS scripts and configuration across Dev, Test and UAT. I also worked on Git practices, Azure DevOps pipelines, environment configuration and release controls."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "How do you promote a change reliably?",
"a": "I promote a versioned package with its required configuration and dependencies, using the agreed approvals and validation. I keep environment-specific values separate and make sure the deployed version is traceable to the reviewed source and tested release."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "Can you always roll back by restoring the old JVS file?",
"a": "No. The release may also change configuration or data, or trigger external actions. I check compatibility and side effects. The recovery plan may require coordinated rollback or a forward fix, not just replacing one script."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "What made your greenfield back-office work different from BAU?",
"a": "In the greenfield work, I helped establish and validate new back-office flows, including static data, confirmations, invoicing and audit checks. In BAU, I focus on maintaining and improving an existing process. For go-live, dependencies, cutover readiness and business acceptance become especially important."
},
{
"s": "Mock interview guide (your CV)",
"o": 1,
"q": "A script passes testing, runs quickly and has no errors. Why could you still reject the release?",
"a": "It may use the wrong business rules, omit records, lack safe restart behaviour or produce incorrect downstream outputs. I would check acceptance criteria, reconciliation, dependencies, support readiness and recovery. Technical success is only part of a reliable business outcome."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "What's your experience with trade capture and deal modelling?",
"a": "I configure new physical and financial products in Endur from scratch — gas, power, capacity, transportation. I customise deal templates using JVS and OpenComponents, handle index-based and complex pricing formulas, and validate trade fields during capture. When a trade fails simulation or validation, I analyse the root cause — could be a missing market data curve, a misconfigured product setup, or a script error — and I fix it."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "Tell me about your TPM experience.",
"a": "TPM is something I've worked on quite heavily. I design task workflows for the trade lifecycle — so things like automated simulations, position updates, and settlement triggers. I configure task dependencies, set up error handling and retry logic, and monitor workflows in production. When a task gets stuck or fails, I check the task logs, identify whether it's a data issue, a dependency problem, or a script failure, and resolve it. Performance is also important — I make sure tasks don't run unnecessarily or block each other."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "How do you handle Connex integrations?",
"a": "I've built several interfaces using Connex — trade feeds going out to risk systems, market data coming in, settlement data going to SAP. I design the XML transformations, set up routing rules, and configure JMS queues. For reliability, I make sure messages are idempotent — so if something gets reprocessed, it doesn't cause duplicate postings. When a message gets stuck in a queue, I check the Connex logs, identify whether it's a transformation issue, a downstream system error, or a connectivity problem, and fix it or requeue it."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "Walk me through the EOD process.",
"a": "End of day in Endur is a multi-step batch process. It typically starts with market data loads — pulling in closing prices and curves. Then simulations run to reprice all open trades. After that, risk reports are generated — VaR, Greeks, position reports. Then settlements and P&L calculations run. Each step has dependencies, so if market data fails, simulations won't price correctly. I monitor the whole batch, handle failures, and optimise where there are bottlenecks — whether that's slow simulations, database query issues, or infrastructure constraints."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "What's your experience with settlements and back office?",
"a": "I configure settlement rules for gas and power trades, customise invoice templates, and troubleshoot cashflow mismatches — like where a calculated amount in Endur doesn't match what SAP is expecting. I work with back office teams on reconciliation issues and make sure the settlement logic correctly reflects the contractual terms of each trade."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "How do you handle market data and curves?",
"a": "I configure forward curves and volatility curves in Endur, set up fixing rules, and automate data ingestion from providers like ICE, EEX, Platts, and Argus. Common issues I deal with are curve breaks — where a curve hasn't loaded or has a gap — and I validate curves before simulations run to catch those early. Pricing anomalies often trace back to a missing or incorrectly shaped curve."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "What regulatory reporting have you supported?",
"a": "I've worked on REMIT and EMIR reporting — making sure all trade and position data is captured correctly and reported on time. This involves checking that mandatory fields are populated, handling corrections when data is late or incorrect, and working with compliance teams to meet reporting deadlines."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "Describe a production issue you resolved.",
"a": "There was a situation where our EOD batch was failing during the simulation phase — traders couldn't get their closing P&L. I immediately checked the batch logs and found simulations were failing due to a missing market data curve for a specific gas hub. I traced it back to an ingestion interface that had silently failed earlier in the day. I manually loaded the curve, restarted the impacted simulations, and got the batch back on track within the hour. After that, I added monitoring on that specific feed so we'd get alerted before EOD if it failed."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "How do you work with traders and business teams?",
"a": "I work directly with traders, risk analysts, schedulers, and back office. When they raise a requirement, I ask the right questions to understand the business need behind it — not just the surface request. I translate that into a technical solution in Endur and then walk them through it in plain language. When there are production issues, I keep them updated on progress without getting too technical, and I manage expectations on timelines."
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "Behavioural answers — quick STAR examples:",
"a": "Tell me about a time you improved a workflow"
},
{
"s": "Reference answers (generic — check claims against CV)",
"o": 0,
"q": "Tell me about a time you improved a workflow",
"a": "I noticed our EOD was running late because certain TPM tasks were running sequentially when they could run in parallel. I redesigned the task dependencies, which reduced batch time by around 30 minutes. Operations were really happy with that."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A trade is amended three times. Which identifier stays the same across all versions?",
"a": "Options: a) tran_num b) deal_tracking_num c) ins_num d) version_number\nAnswer: b - deal_tracking_num is the stable deal ID; each amendment creates a new tran_num."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Your SQL on ab_tran returns 3 rows for one deal. What filter did you most likely forget?",
"a": "Options: a) tran_status = 3 b) current_flag = 1 c) ins_type > 0 d) toolset = 1\nAnswer: b - current_flag = 1 returns only the latest version of each deal."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Why must you call destroy() on an Endur Table even though Java has garbage collection?",
"a": "Options: a) Commits table to DB b) Table memory is native, outside the Java heap c) GC runs only a t EOD d) Releases lock on ab_tran\nAnswer: b - GC can't reclaim native memory; a missing destroy() causes leaks and service cras hes."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Where should tbl.destroy() be placed to guarantee it always runs?",
"a": "Options: a) End of try b) catch block c) finally block d) Constructor\nAnswer: c - finally runs on success, exception and early return."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "You need to block a trade from booking if the counterparty has no LEI. Which TPM step?",
"a": "Options: a) Post-process b) Pre-process c) EOD batch d) OpenFeed script\nAnswer: b - Pre-process runs before commit and can abort with Util.exitFail()."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A post-process confirmation script throws an exception. What happens to the trade?",
"a": "Options: a) Rolled back to Pending b) Deleted c) Stays saved; downstream action fails d) Auto-ca ncelled\nAnswer: c - Post-process runs after commit; you need retry/queue logic and alerting."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Which call aborts a validation/pre-process script and shows a message to the user?",
"a": "Options: a) Util.exitSucceed() b) Util.exitFail(message) c) System.exit(1) d) OConsole.oprint()\nAnswer: b - Never use System.exit(); it can kill the whole process."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A batch script calls Transaction.retrieve() in a loop over 20,000 deals and takes hours. Best fix?",
"a": "Options: a) More threads b) Bigger JVM heap c) One bulk DBase SQL query, then process in memory d) Run it twice overnight\nAnswer: c - Loading full transaction objects one by one is slow; use one bulk query for read-only batch work."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "findInt on a Table returns wrong or missing matches. Most likely cause?",
"a": "Options: a) Table not sorted on the search column b) Column type was Double c) Too many rows d) Table destroyed early\nAnswer: a - Find methods use binary search; sort first."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Endur Table rows are indexed starting from:",
"a": "Options: a) 0 b) 1 c) -1 d) Depends on column type\nAnswer: b - Rows are 1-based; looping from 0 is a classic off-by-one bug."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "What does OCalendar.today() return?",
"a": "Options: a) java.util.Date b) dd-MMM-yyyy string c) Integer Julian date based on Endur's business date d) Server clock in ms\nAnswer: c - Endur business date can differ from the server clock (e.g. after a date roll)."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A payment date lands on a UK bank holiday. What went wrong?",
"a": "Options: a) Calendar days added instead of business days with the right holiday calendar b) Wrong b ook c) current_flag not set d) Stale curve\nAnswer: a - Use business-day functions with the correct calendar (e.g. GBP)."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Where would you store a custom deal attribute like \"Strategy Code\"?",
"a": "Options: a) New column on ab_tran b) A tran info field (ab_tran_info) c) Party table d) Deal re ference comment\nAnswer: b - Tran info is the supported extension mechanism; never alter core tables."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A TPM pre-process script is failing and blocking ALL bookings. First action?",
"a": "Options: a) Hotfix directly in PROD b) Restart the DB c) Disable/bypass the failing rule so tradi ng resumes, then investigate d) Traders use spreadsheets indefinitely\nAnswer: c - Mitigate first; then reproduce in UAT, fix, test, re-enable under change contro l."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "TPM retries a post-process confirm step. How do you avoid duplicate confirms?",
"a": "Options: a) Thread.sleep() b) Make the step idempotent - check a queue/audit table keyed by deal + version c) Run once a day d) Disable retries\nAnswer: b - Idempotency is a core STP design principle."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "How do you detect in a TPM script that the event is an amendment?",
"a": "Options: a) Version number > 1 b) trade_date = today c) tran_num is even d) Book name\nAnswer: a - Then compare with the previous version to derive what changed."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Two TPM scripts update the same counterparty utilisation row at the same time. Risk and fix?",
"a": "Options: a) No risk b) Lost update; row locking or atomic UPDATE (SET used = used + x) c) Deadloc k; add a sleep d) Memory leak; call destroy()\nAnswer: b - Read-modify-write from two sessions can overwrite each other."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "You pass deals into a sim via a query ID. What must you do afterwards?",
"a": "Options: a) Nothing b) Clear the query result to free query_result rows c) Restart the sim server d) Delete the deals\nAnswer: b - Uncleared query IDs bloat the query_result table."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Daily PnL for a deal is best expressed as:",
"a": "Options: a) Today MTM only b) Today MTM - Yesterday MTM + cash settled today c) Notional x price d) Yesterday MTM - Today MTM\nAnswer: b - Without settled cash, a payment looks like a loss."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "In a PnL explain, the components don't sum to total PnL change. What do you do with the diff erence?",
"a": "Options: a) Add to market move b) Hide it c) Report as unexplained/residual and investigate d) Round to zero\nAnswer: c - A visible residual is a control; it often means missing fixings, static changes or back-dated trades."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A trader's spreadsheet PnL differs from Endur on one swap. Which is NOT a typical cause?",
"a": "Options: a) Different curve snapshot time b) Different holiday calendar/day count c) Portfolio na me length d) Stale index data\nAnswer: c - The book name has no pricing effect."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "No price arrives for a liquid index today. Most common controlled fallback?",
"a": "Options: a) Set price to zero b) Carry forward last good price, flag stale and alert c) Skip pric ing d) Random walk\nAnswer: b - A zero price creates huge fake PnL."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Market data recon flags many mismatches daily at the same hour. Likely non-data cause?",
"a": "Options: a) Time-zone/snapshot timing difference b) Table not destroyed c) Wrong book filter d) Deal amendments\nAnswer: a - Align comparison times first."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Netting settlement cash flows - correct grouping key?",
"a": "Options: a) Counterparty + currency + value date (with netting agreement) b) Book + trader c) Ins trument type d) Trade date\nAnswer: a - Always keep gross records for audit."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Which API is the strategic direction for new plugins over classic JVS?",
"a": "Options: a) OpenComponents (OC) b) AVS c) Raw JDBC d) VBA\nAnswer: a - JVS is still common in legacy code, so know both."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "A script works in UAT but fails in PROD with \"table/column not found\". Most likely cause?",
"a": "Options: a) Java version mismatch b) USER table/config not deployed to PROD c) Trader permissions d) Market data gap\nAnswer: b - DB objects and config belong on the release checklist, not just code."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Best way to make overnight batch failures visible before traders arrive?",
"a": "Options: a) Check logs when someone complains b) Log start/end status to a batch log table; monitor alerts on failed/overdue runs c) Print to console d) Run batches during the day\nAnswer: b - Turns silent failures into proactive alerts."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Running one SQL per deal inside a loop over 10,000 deals is called:",
"a": "Options: a) Deadlock b) N+1 query problem c) Cartesian join d) Dirty read\nAnswer: b - Fetch once before the loop; look up in an in-memory Table."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Thresholds like \"80% limit alert\" should be stored where?",
"a": "Options: a) Hardcoded constants b) A USER config table c) Script file name d) Env variables on traders' PCs\nAnswer: b - Change without redeployment; one build across environments."
},
{
"s": "JVS developer quiz",
"o": 0,
"q": "Gross credit exposure to a counterparty is typically the sum of:",
"a": "Options: a) All MTMs b) Positive MTMs only (owed to us) c) Notionals d) Negative MTMs only\nAnswer: b - With a netting agreement, net within the netting set first."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "NBP & Endur Settlement Desktop — NBP gas hub / Settlement Desktop",
"a": "NBP & Endur Settlement Desktop\nInterview cheat sheet — Power & Gas, Middle/Back Office\n1. NBP — National Balancing Point\n• What it is: the UK's main wholesale natural gas trading hub.\n• Virtual, not physical: any gas that has entered the UK national transmission system counts as being \"at the\nNBP\".\n• Operator: National Gas Transmission (formerly part of National Grid).\n• Price unit: pence per therm (p/th).\n• Price sources: ICE Endex NBP futures settlement prices, plus price reporting agencies (ICIS Heren, Argus,\nPlatts).\n• Common prices published: day-ahead (DA), month-ahead (MA), within-day, seasonal contracts.\n• Gas day: 05:00 to 05:00 UK time, not midnight to midnight — matters for daily fixings and volumes."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "Peer hubs — NBP gas hub / Settlement Desktop",
"a": "Peer hubs\nHub\nRegion\nPrice unit\nNBP\nUK\np/th\nTTF\nNetherlands\n€/MWh\nHenry Hub\nUS\n$/MMBtu"
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "Conversions — NBP gas hub / Settlement Desktop",
"a": "Conversions\nFrom\nTo\n1 therm\n29.3071 kWh\n1 MWh\n34.1214 therms\n1 therm\n0.1 MMBtu\n10 therms\n1 MMBtu\n• p/th → £/MWh: multiply by 0.341214. Example: 100 p/th ≈ £34.12/MWh.\n• NBP vs TTF: convert NBP to £/MWh, then apply the GBP→EUR FX rate to compare with TTF's €/MWh."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "Endur angle — NBP gas hub / Settlement Desktop",
"a": "Endur angle\n• NBP is set up as an index (e.g. NBP_DA, NBP_MA — names vary by site). Floating legs reference it.\n• Before fixing: the deal is valued off the NBP forward curve, so amounts are estimates.\n• After fixing: fixings stored as historical prices (idx_historical_prices), the deal's resets are filled, and the cash\nevent becomes a known amount.\n• Unit conversion: if the deal unit (MWh/kWh) differs from the index unit (therms), Endur converts via idx_unit\nand conversion factors — a common source of PnL and invoice breaks when misconfigured.\nExample: Jan–Mar NBP swap. When January ends, January's NBP prices are fixed and the January event\nchanges from an estimate to a known amount. February and March are still estimates off the forward curve."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "2. Settlement Desktop (Document Processing) — NBP gas hub / Settlement Desktop",
"a": "2. Settlement Desktop (Document Processing)"
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "Where the screen values come from — NBP gas hub / Settlement Desktop",
"a": "Where the screen values come from\nScreen column\nLikely source\nExternal Business Unit\nab_tran.external_bunit → party.short_name\nBuy/Sell\nab_tran.buy_sell\nQuantity\nab_tran_event.para_position or deal/schedule volume (comm_schedule_* for\npower/gas physicals)\nTotal / Current Settle Amount\nRecomputed live from the current event amount (ab_tran_event,\nab_tran_event_settle)\nNBP & Endur Settlement Desktop — cheat sheet\nPage 1\n\fSaved Settle Amount\nAmount stored when the document was saved (stldoc_details; header in\nstldoc_header). 0.00 if no document yet\nCCY / Unit\ncurrency table / idx_unit\nPayment Due Date\nCash event date (ab_tran_event.event_date), carried onto stldoc_details\nWT Deal #, OASIS #, custom\nrefs\nSite-specific — usually ab_tran_info or document info fields, possibly\nscript-populated\n• Current ≠ Saved (highlighted cells): the deal or event changed after the document was saved (amendment,\nre-price, re-actualised volume). Usually leads to cancel/re-issue.\n• Confirm on your system: check the view definition, trace the SQL while clicking Update, or query\nstldoc_details vs ab_tran_event for one deal."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "What rows and groups mean — NBP gas hub / Settlement Desktop",
"a": "What rows and groups mean\n• Folder row (e.g. \"8 Items\") = one prospective settlement document (candidate stldoc_header).\n• Item inside it = one cash event (ab_tran_event row) → becomes a document detail line (stldoc_details).\n• \"507 Groups\" = 507 documents would be created if everything were processed.\n• Group total nets its lines: e.g. 4 × 46,028.46 − 4 × 118,285.77 = (289,029.24).\n• Current Status = New: event not yet on any document. Move To Status = Draft: status the document gets\nwhen processed.\n• Same BU in two groups: grouping uses several keys (BUs, currency, payment date, settlement instructions,\ndoc type). Any difference → separate document."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "When a document is created in the lifecycle — NBP gas hub / Settlement Desktop",
"a": "When a document is created in the lifecycle\n1. Deal booked and validated — events generated immediately (ab_tran_event), mostly estimates. No settlement\ndocument yet.\n2. Events appear as \"New\" once they meet the view definition criteria (deal status, event type, BUs, date\nwindow).\n3. Delivery period ends — prices fix and volumes are actualised; amounts become known.\n4. Events processed → document created (usually Draft). Manual (Process Documents) or a scheduled\noperations job. Typically in the monthly invoicing cycle after delivery.\n5. Document workflow — e.g. Draft → Generated/Sent → Final/Paid, per site configuration.\nAmendments after creation — Current vs Saved mismatch → cancel, re-issue or new version per workflow.\nNote: confirmations often use the same document framework and are created at or just after booking;\nsettlement/invoice documents come later."
},
{
"s": "NBP & Settlement Desktop cheat sheet",
"o": 0,
"q": "Interview line: \"Events are created at booking. The settlement document is created when those events are — NBP gas hub / Settlement Desktop",
"a": "Interview line: \"Events are created at booking. The settlement document is created when those events are\nprocessed in the Settlement Desktop, normally after the delivery period once amounts are final. That can be\nmanual or a scheduled job, and amendments after that point are handled through the document's cancel or\nre-issue workflow.\"\nNBP & Endur Settlement Desktop — cheat sheet\nPage 2"
},
{
"s": "JVS programming examples",
"o": 0,
"q": "1.1 Creating and populating a Table",
"a": "The Endur Table object is an in-memory grid. Always destroy it in a finally block."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "1.2 Iterating rows and finding values",
"a": "Use findInt() / findString() to search columns efficiently rather than a manual loop."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "2.1 Running a SQL query into a Table",
"a": "DBase.runSqlFillTable() is the standard way to bulk-read from Endur's database. Always filter by current_flag = 1 to exclude superseded amendment versions."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "2.2 Bulk insert / update via DBase.runSql()",
"a": "Use DBase.runSql() for INSERT and UPDATE statements. Build the SQL string in JVS."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "3.1 Reading standard tran fields in a TPM script",
"a": "In a TPM script the current transaction is passed in via argt. Use TRANF_FIELD enums to read each field."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "3.2 Reading tran_info (custom extension fields)",
"a": "tran_info fields are custom key-value pairs stored in ab_tran_info. Read them by info type ID."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "3.3 Reading leg-level fields on a swap",
"a": "Swap deals have multiple legs. Legs are 1-indexed. Read leg-specific data using getLegFieldInt() / getLegFieldDouble()."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "4.1 Core date operations",
"a": "Endur stores dates as Julian integers. OCalendar provides all date manipulation. Never use raw integer addition for date arithmetic."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "5.1 Pre-process validation script skeleton",
"a": "Category: SCRIPT_CAT_TRAN_VALIDATE. Fires before the trade is committed. Can block booking via Util.exitFail()."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "5.2 Post-process script skeleton — writing to a USER queue table",
"a": "Post-process scripts fire after the trade is committed. They cannot roll back the trade but can trigger downstream actions."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "6.1 Reading a spot rate",
"a": "Index.getSpotRate() returns the current spot price for a named index on a given date."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "6.2 Loading and iterating a forward curve",
"a": "Index.loadCurve() returns a Table with curve date and price columns. Always destroy the returned Table."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "7.1 Running a named query to get a deal set",
"a": "Query.run() executes a named query pre-configured in Endur Admin and returns a query ID usable in Sim.run()."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "7.2 Running a simulation and reading MTM results",
"a": "Sim.run() re-prices the deal set defined by queryId using the specified simulation definition. Results land in USER_RESULT_STL."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "8.1 The try/finally destroy pattern",
"a": "This is the single most tested memory pattern in Endur interviews. Every Table must be destroyed, including in error/exception branches."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "8.2 In-memory lookup pattern — eliminating N+1 queries",
"a": "Pre-load reference data into a Table, sort on the key column, then use findInt() for O(log n) lookups instead of repeated SQL calls."
},
{
"s": "JVS programming examples",
"o": 0,
"q": "8.3 Helper method pattern — encapsulate query + destroy",
"a": "Wrap SQL queries in private helper methods that return only scalar values, keeping destroy() guaranteed inside the helper. This makes scripts cleaner and leak-proof."
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "Front & Middle Office Interview Preparation",
"a": "Front & Middle Office Interview Preparation\nENDUR JVS\nProgramming Examples\nFront Office & Middle Office — Basic to Moderate\nMemory rule: every Table created in JVS must be destroyed in a finally block. The Java GC will NOT free native Endur Table memory.\n1 | Table API — Creation, Population & Destruction\nJVS\nimport com.olf.openjvs.*;\nimport com.olf.openjvs.enums.*;\npublic class TableBasics implements IScript {\npublic void execute(IContainerManager containerMgr) throws OException {\n Table myTable = Table.tableNew(\"MyData\");\n try {\n // Add typed columns\n myTable.addCol(\"deal_num\", COL_TYPE_ENUM.COL_INT);\n myTable.addCol(\"book\", COL_TYPE_ENUM.COL_STRING);\n myTable.addCol(\"mtm_value\", COL_TYPE_ENUM.COL_DOUBLE);\n myTable.addCol(\"trade_date\", COL_TYPE_ENUM.COL_DATE_TIME);\n// Add a row and populate it\n myTable.addRow();\n int row = myTable.getNumRows(); // rows are 1-indexed\n myTable.setInt( \"deal_num\", row, 123456);\n myTable.setString(\"book\", row, \"GAS_TRADING\");\n myTable.setDouble(\"mtm_value\", row, 150000.00);\n myTable.setDateTime(\"trade_date\", row, OCalendar.today(), 0);"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// Read values back",
"a": "// Read values back\n int dealNum = myTable.getInt( \"deal_num\", 1);\n String bookName = myTable.getString(\"book\", 1);\n double mtm = myTable.getDouble(\"mtm_value\", 1);\nUtil.printMessage(\"Deal: \" + dealNum + \" Book: \" + bookName\n + \" MTM: \" + mtm);\n } finally {\n // CRITICAL: must always destroy — GC does not free native memory\n myTable.destroy();\n }\n }\n}\nJVS\n// Iterate every row\nint numRows = myTable.getNumRows();\nfor (int r = 1; r <= numRows; r++) {\n double val = myTable.getDouble(\"mtm_value\", r);\n if (val > 0) {\n Util.printMessage(\"Row \" + r + \" positive MTM: \" + val);\n }\n}"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// Binary search — table must be sorted on the column first",
"a": "// Binary search — table must be sorted on the column first\nmyTable.sortCol(\"deal_num\", TABLE_SORT_DIR_ENUM.TABLE_SORT_DIR_ASCENDING, 0);\nint foundRow = myTable.findInt(\"deal_num\", 123456, SEARCH_ENUM.FIRST_IN_GROUP);\nif (foundRow > 0) {\n Util.printMessage(\"Found deal at row \" + foundRow);\n} else {\n Util.printMessage(\"Deal not found\");\n}\n2 | DBase API — SQL Queries & Bulk Data\nJVS\nTable results = Table.tableNew(\"ActiveDeals\");\ntry {\n String sql =\n \"SELECT a.deal_tracking_num, a.tran_num, \" +\n \" p.name AS book_name, \" +\n \" a.position, a.currency, \" +\n \" a.trade_date, a.mat_date \" +\n \"FROM ab_tran a \" +\n \"JOIN portfolio p ON p.id_number = a.internal_portfolio \" +\n \"WHERE a.tran_status = 3 \" + // 3 = Validated\n \"AND a.current_flag = 1 \"; // latest version only\nint ret = DBase.runSqlFillTable(sql, results);\n if (ret != OLF_RETURN_CODE.OLF_RETURN_SUCCEED.toInt()) {\n throw new OException(\"SQL query failed: \" + ret);\n }\nUtil.printMessage(\"Rows returned: \" + results.getNumRows());"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "for (int r = 1; r <= results.getNumRows(); r++) {",
"a": "for (int r = 1; r <= results.getNumRows(); r++) {\n int deal = results.getInt( \"deal_tracking_num\", r);\n String book = results.getString(\"book_name\", r);\n Util.printMessage(\" Deal \" + deal + \" in \" + book);\n }\n} finally {\n results.destroy();\n}\nPerformance: never call DBase.runSqlFillTable() inside a loop. Fetch all data in one query before the loop, then use Table.findInt() for in-memory lookups — this is the fix for the classic N+1 problem.\nJVS\n// Write a record to a USER audit table\nString insertSql =\n \"INSERT INTO USER_LIMIT_CHECK_LOG \" +\n \"(check_date, deal_num, book, result, checked_by) VALUES (\" +\n OCalendar.today() + \", \" +\n dealNum + \", \" +\n \"'\" + bookName + \"', \" +\n \"'PASS', \" +\n \"'SYS_JVS')\";\nint ret = DBase.runSql(insertSql);\nif (ret != OLF_RETURN_CODE.OLF_RETURN_SUCCEED.toInt()) {\n Util.exitFail(\"Audit insert failed\");\n}\n3 | Transaction API — Reading Deal Fields\nJVS\nimport com.olf.openjvs.*;\nimport com.olf.openjvs.enums.*;\npublic class ReadTranFields implements IScript {\npublic void execute(IContainerManager containerMgr) throws OException {\n Table argt = containerMgr.getARGT();"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// Get the transaction object from argt",
"a": "// Get the transaction object from argt\n Transaction tran = Transaction.retrieve(argt.getInt(\"tran_num\", 1));\n try {\n // Standard deal fields\n int dealNum = tran.getFieldInt(TRANF_FIELD.TRANF_DEAL_TRACKING_NUM);\n int tranStatus = tran.getFieldInt(TRANF_FIELD.TRANF_TRAN_STATUS);\n int insType = tran.getFieldInt(TRANF_FIELD.TRANF_INS_TYPE);\n int intPort = tran.getFieldInt(TRANF_FIELD.TRANF_INTERNAL_PORTFOLIO);\n int extLentity = tran.getFieldInt(TRANF_FIELD.TRANF_EXTERNAL_LENTITY);\n double notional = tran.getFieldDouble(TRANF_FIELD.TRANF_POSITION);\n int currency = tran.getFieldInt(TRANF_FIELD.TRANF_CURRENCY);\n int tradeDate = tran.getFieldInt(TRANF_FIELD.TRANF_TRADE_DATE);\n int matDate = tran.getFieldInt(TRANF_FIELD.TRANF_MAT_DATE);\nUtil.printMessage(\"Deal: \" + dealNum\n + \" Status: \" + tranStatus\n + \" Notional: \" + notional);"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "} finally {",
"a": "} finally {\n if (tran != null) tran.destroy();\n }\n }\n}\nJVS\n// Read a tran_info field (e.g. trader name stored at info type 5001)\nint INFO_TYPE_TRADER = 5001;\nString traderName = tran.getField(TRANF_FIELD.TRANF_TRAN_INFO,\n 0, // leg number (0 = deal level)\n \"\", // not used for tran_info\n INFO_TYPE_TRADER);\n// Write a tran_info field\nint INFO_TYPE_BROKER = 5002;\ntran.setField(TRANF_FIELD.TRANF_TRAN_INFO,\n 0,\n \"BROKER_NAME\", // info type name\n INFO_TYPE_BROKER,\n \"MorganFX\");\n// Guard against null or empty tran_info\nif (traderName == null || traderName.trim().isEmpty()) {\n Util.exitFail(\"Trader name tran_info is missing — cannot book deal\");\n}\nJVS\n// Example: read fixed rate and floating index from a 2-leg commodity swap\nint NUM_LEGS = 2;\nfor (int leg = 1; leg <= NUM_LEGS; leg++) {\n int legType = tran.getLegFieldInt( leg, TRANF_FIELD.TRANF_PROJ_INDEX);\n double fixedRate= tran.getLegFieldDouble(leg, TRANF_FIELD.TRANF_FIXED_PRICE);\n int startDt = tran.getLegFieldInt( leg, TRANF_FIELD.TRANF_START_DATE);\n int matDt = tran.getLegFieldInt( leg, TRANF_FIELD.TRANF_MAT_DATE);\n int payFreq = tran.getLegFieldInt( leg, TRANF_FIELD.TRANF_PAYMENT_FREQ);"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "Util.printMessage(\"Leg \" + leg",
"a": "Util.printMessage(\"Leg \" + leg\n + \" Index: \" + legType\n + \" Fixed rate: \" + fixedRate\n + \" Pay freq: \" + payFreq);\n}\n4 | OCalendar — Date Arithmetic\nJVS\n// Today's Julian date\nint today = OCalendar.today();\n// Add business days with a named holiday calendar\nint settleDt = OCalendar.addBusinessDays(today, 2, \"GBP\"); // T+2 London\nint payDt = OCalendar.addBusinessDays(today, 5, \"TARGET\"); // T+5 EUR\n// Check if a date is a business day\nboolean isBizDay = OCalendar.isBusinessDay(today, \"GBP\");\n// Next / previous business day\nint nextBizDay = OCalendar.getNextBusinessDay(today, \"GBP\");\nint prevBizDay = OCalendar.getPrevBusinessDay(today, \"GBP\");\n// Format for display (DD-Mon-YYYY)\nString displayDate = OCalendar.formatJd(\n settleDt,\n DATE_FORMAT.DATE_FORMAT_DMLY_NOSLASH,\n DATE_LOCALE.DATE_LOCALE_DEFAULT);\n// Parse a string date back to Julian\nint parsedDt = OCalendar.parseString(\"15-Jun-2025\");\n// Julian to calendar parts\nint day = OCalendar.getDay( settleDt);\nint month = OCalendar.getMonth(settleDt);\nint year = OCalendar.getYear( settleDt);"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "Util.printMessage(\"Settle: \" + displayDate",
"a": "Util.printMessage(\"Settle: \" + displayDate\n + \" (\" + day + \"/\" + month + \"/\" + year + \")\");\nAlways specify the correct holiday calendar — GBP for London, TARGET for Euro, USD_FED for US. Wrong calendars cause settlement failures on bank holidays.\n5 | TPM Scripts — Pre-process & Post-process Patterns\nJVS\nimport com.olf.openjvs.*;\nimport com.olf.openjvs.enums.*;\n@ScriptAttributes(allowNativeExceptions=false)\npublic class PreProcessValidation implements IScript {\npublic void execute(IContainerManager containerMgr) throws OException {\n Table argt = containerMgr.getARGT();\n Table retT = Table.tableNew(\"return\");\n Transaction tran = null;\ntry {\n int tranNum = argt.getInt(\"tran_num\", 1);\n tran = Transaction.retrieve(tranNum);\n// ── read fields ──────────────────────────────────\n int extLentity = tran.getFieldInt(TRANF_FIELD.TRANF_EXTERNAL_LENTITY);\n double notional = tran.getFieldDouble(TRANF_FIELD.TRANF_POSITION);\n int insType = tran.getFieldInt(TRANF_FIELD.TRANF_INS_TYPE);\n// ── guard: skip non-applicable instrument types ──\n if (insType != INS_TYPE_ENUM.cash_settle.toInt()) {\n Util.exitSucceed();\n return;\n }"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// ── credit limit check ───────────────────────────",
"a": "// ── credit limit check ───────────────────────────\n double creditLimit = getCreditLimit(extLentity);\n double currentExposure = getCurrentExposure(extLentity);\nif (currentExposure + notional > creditLimit) {\n Util.exitFail(\n \"Credit limit breached for CP \" + extLentity +\n \". Limit: \" + creditLimit +\n \", Used: \" + currentExposure +\n \", New: \" + notional);\n return;\n }\nUtil.exitSucceed();\n} finally {\n if (tran != null) tran.destroy();\n retT.destroy();\n }\n }\nprivate double getCreditLimit(int cpId) throws OException {\n Table lim = Table.tableNew();\n try {\n DBase.runSqlFillTable(\n \"SELECT credit_limit FROM USER_CREDIT_LIMIT WHERE cp_id = \" + cpId, lim);\n return (lim.getNumRows() > 0) ? lim.getDouble(\"credit_limit\", 1) : 0.0;\n } finally { lim.destroy(); }\n }"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "private double getCurrentExposure(int cpId) throws OException {",
"a": "private double getCurrentExposure(int cpId) throws OException {\n Table exp = Table.tableNew();\n try {\n DBase.runSqlFillTable(\n \"SELECT SUM(mtm_value) AS exposure \" +\n \"FROM USER_RESULT_STL \" +\n \"WHERE external_lentity = \" + cpId +\n \" AND result_type = 1\", exp); // 1 = MTM\n return (exp.getNumRows() > 0) ? exp.getDouble(\"exposure\", 1) : 0.0;\n } finally { exp.destroy(); }\n }\n}\nJVS\n@ScriptAttributes(allowNativeExceptions=false)\npublic class PostProcessConfirm implements IScript {\npublic void execute(IContainerManager containerMgr) throws OException {\n Table argt = containerMgr.getARGT();\n Transaction tran = null;\ntry {\n int tranNum = argt.getInt(\"tran_num\", 1);\n tran = Transaction.retrieve(tranNum);\nint dealNum = tran.getFieldInt(TRANF_FIELD.TRANF_DEAL_TRACKING_NUM);\n int cpId = tran.getFieldInt(TRANF_FIELD.TRANF_EXTERNAL_LENTITY);\n int tradeDate = tran.getFieldInt(TRANF_FIELD.TRANF_TRADE_DATE);"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// Write to confirmation queue — downstream process will transmit",
"a": "// Write to confirmation queue — downstream process will transmit\n String insertSql =\n \"INSERT INTO USER_CONFIRM_QUEUE \" +\n \"(deal_num, cp_id, trade_date, status, created_time) VALUES (\" +\n dealNum + \", \" +\n cpId + \", \" +\n tradeDate + \", 'PENDING', GETDATE())\";\nint ret = DBase.runSql(insertSql);\n if (ret != OLF_RETURN_CODE.OLF_RETURN_SUCCEED.toInt()) {\n // Log the failure but do NOT exitFail — trade is already booked\n Util.printMessage(\"ERROR: failed to write confirm queue for deal \" + dealNum);\n }\n} finally {\n if (tran != null) tran.destroy();\n }\n }\n}\n6 | Market Data — Index & Curve Access\nJVS\n// Get today's spot rate for the NBP gas index\nint indexId = Index.getIndexId(\"NBP\");\nif (indexId <= 0) {\n Util.exitFail(\"Index 'NBP' not found in Endur\");\n}\nint today = OCalendar.today();\ndouble spotRate = Index.getSpotRate(indexId, today);\nUtil.printMessage(\"NBP spot rate: \" + spotRate + \" p/therm\");\nJVS\nint indexId = Index.getIndexId(\"TTF\");\nint today = OCalendar.today();\nTable curve = null;\ntry {\n curve = Index.loadCurve(indexId, today);"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "if (curve == null || curve.getNumRows() == 0) {",
"a": "if (curve == null || curve.getNumRows() == 0) {\n Util.printMessage(\"WARNING: no curve data for TTF on \" +\n OCalendar.formatJd(today, DATE_FORMAT.DATE_FORMAT_DMLY_NOSLASH,\n DATE_LOCALE.DATE_LOCALE_DEFAULT));\n return;\n }\nint numRows = curve.getNumRows();\n Util.printMessage(\"TTF curve — \" + numRows + \" points:\");\nfor (int r = 1; r <= numRows; r++) {\n int curveDate = curve.getInt( \"date\", r);\n double curvePrice = curve.getDouble(\"price\", r);\n String dtStr = OCalendar.formatJd(curveDate,\n DATE_FORMAT.DATE_FORMAT_DMLY_NOSLASH,\n DATE_LOCALE.DATE_LOCALE_DEFAULT);\n Util.printMessage(\" \" + dtStr + \" -> \" + curvePrice);\n }\n} finally {\n if (curve != null) curve.destroy(); // critical — caller must destroy\n}\n7 | Query API & Simulation\nJVS\n// Run a named query defined in Endur Admin\nint queryId = Query.run(\"ALL_VALIDATED_GAS_DEALS\");\nif (queryId <= 0) {\n Util.exitFail(\"Query 'ALL_VALIDATED_GAS_DEALS' returned no results or failed\");\n}\nUtil.printMessage(\"Query ID: \" + queryId);\n// queryId is now passed into Sim.run() or used to build a result table\n// Clean up the query result set when done\nQuery.clear(queryId);\nJVS\nint queryId = Query.run(\"ALL_VALIDATED_GAS_DEALS\");\nTable results = Table.tableNew(\"SimResults\");"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "try {",
"a": "try {\n if (queryId <= 0) {\n Util.exitFail(\"Query failed\");\n }\n// Run the sim — sim def configured in Endur Admin\n int runId = Sim.run(\"MTM_LIVE_SIM\", queryId);\n if (runId <= 0) {\n Util.exitFail(\"Sim run failed, runId: \" + runId);\n }\nUtil.printMessage(\"Sim completed, runId: \" + runId);\n// Read MTM results from USER_RESULT_STL\n DBase.runSqlFillTable(\n \"SELECT deal_tracking_num, mtm_value \" +\n \"FROM USER_RESULT_STL \" +\n \"WHERE sim_run_id = \" + runId +\n \" AND result_type = 1\", // 1 = MTM\n results);\ndouble totalMTM = 0.0;\n for (int r = 1; r <= results.getNumRows(); r++) {\n totalMTM += results.getDouble(\"mtm_value\", r);\n }\n Util.printMessage(\"Portfolio MTM: \" + totalMTM);\n} finally {\n results.destroy();\n if (queryId > 0) Query.clear(queryId);\n}\n8 | Memory Management & Best Practices\nJVS\n// ✅ CORRECT — destroy in finally covers all code paths\nTable t1 = Table.tableNew(\"T1\");\nTable t2 = null; // initialise null so finally guard is safe\ntry {\n DBase.runSqlFillTable(\"SELECT ...\", t1);\n t2 = Table.tableNew(\"T2\");\n // ... process ...\n} finally {\n t1.destroy();\n if (t2 != null) t2.destroy();\n}"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// ❌ WRONG — exception before destroy leaks native memory forever",
"a": "// ❌ WRONG — exception before destroy leaks native memory forever\nTable t = Table.tableNew(\"T\");\nDBase.runSqlFillTable(sql, t); // throws OException\nt.destroy(); // never reached!\nJVS\n// ── Step 1: bulk-load counterparty names ONCE before the loop ──\nTable cpLookup = Table.tableNew(\"CpNames\");\ntry {\n DBase.runSqlFillTable(\n \"SELECT party_id, short_name FROM party\", cpLookup);\n cpLookup.sortCol(\"party_id\",\n TABLE_SORT_DIR_ENUM.TABLE_SORT_DIR_ASCENDING, 0);\n// ── Step 2: iterate deals and lookup in memory ──────────────\n for (int r = 1; r <= dealTable.getNumRows(); r++) {\n int cpId = dealTable.getInt(\"external_lentity\", r);\n// O(log n) binary search — NO additional SQL\n int cpRow = cpLookup.findInt(\"party_id\", cpId,\n SEARCH_ENUM.FIRST_IN_GROUP);\n String cpName = (cpRow > 0)\n ? cpLookup.getString(\"short_name\", cpRow)\n : \"UNKNOWN\";\nUtil.printMessage(\"Deal \" + r + \" CP: \" + cpName);\n }"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "} finally {",
"a": "} finally {\n cpLookup.destroy(); // destroy lookup after loop\n}\nJVS\n/** Returns credit limit for cpId, or 0 if not found. Always destroys its Table. */\nprivate double getCreditLimit(int cpId) throws OException {\n Table t = Table.tableNew();\n try {\n DBase.runSqlFillTable(\n \"SELECT credit_limit FROM USER_CREDIT_LIMIT WHERE cp_id = \" + cpId, t);\n return (t.getNumRows() > 0) ? t.getDouble(\"credit_limit\", 1) : 0.0;\n } finally {\n t.destroy(); // always runs, even if OException thrown\n }\n}"
},
{
"s": "JVS programming examples (code)",
"o": 0,
"q": "// Caller receives a double — no Table to manage",
"a": "// Caller receives a double — no Table to manage\ndouble limit = getCreditLimit(extLentityId);\n9 | Quick Reference — Key API Calls\nAPI Call | Returns | Use For\nOCalendar.today() | int (Julian) | Get current date as Julian integer\nOCalendar.addBusinessDays(date, n, cal) | int (Julian) | T+n settlement date with holiday calendar\nOCalendar.formatJd(date, format, locale) | String | Format Julian date for display\nDBase.runSqlFillTable(sql, tbl) | int (return code) | Bulk SQL into a Table — check return code\nDBase.runSql(sql) | int (return code) | INSERT / UPDATE / DELETE\ntran.getFieldInt(TRANF_FIELD.X) | int | Read integer deal field\ntran.getFieldDouble(TRANF_FIELD.X) | double | Read numeric deal field\ntran.getFieldString(TRANF_FIELD.X) | String | Read string deal field\ntran.getLegFieldInt(leg, TRANF_FIELD.X) | int | Read leg-level integer field\nIndex.getIndexId(name) | int | Get index ID by name\nIndex.getSpotRate(indexId, date) | double | Get spot price for an index\nIndex.loadCurve(indexId, date) | Table | Load forward curve — must destroy\nQuery.run(queryName) | int (queryId) | Execute named query — pass to Sim.run\nQuery.clear(queryId) | void | Release query result set after use\nSim.run(simDef, queryId) | int (runId) | Run simulation over deal set\nTable.tableNew(name) | Table | Create in-memory table — must destroy\ntbl.addCol(name, COL_TYPE_ENUM.X) | void | Add typed column\ntbl.addRow() | void | Append a row\ntbl.sortCol(col, dir, 0) | void | Sort for binary search\ntbl.findInt(col, val, SEARCH_ENUM.X) | int (row) | Binary search — sort column first\ntbl.destroy() | void | CRITICAL: free native memory\nUtil.exitFail(msg) | void | Abort booking (pre-process scripts)\nUtil.exitSucceed() | void | Allow booking to proceed\nStudy tip: Interviewers frequently ask you to write the try/finally destroy pattern from memory, explain the difference between DBase and Transaction API, and describe how a pre-process vs post-process TPM script differs. Practise these until they are automatic."
},
{
"s": "Endur notes workbook: Endur",
"o": 0,
"q": "Endur: What is OpenLink Endur?",
"a": "What is OpenLink Endur?\nOpenLink Endur (owned by ION Group) is an Energy Trading and Risk Management (ETRM) platform used by companies that buy, sell, transport, settle, and account for energy commodities.\nIt provides a single system to manage the complete lifecycle of physical and financial energy trades—from trade capture through risk management, settlement, invoicing, and accounting\nWhy is OpenLink Endur required?\nEnergy trading is significantly more complex than typical retail or ERP transactions.\nFor example, suppose a power company agrees to sell:\n100 MW of electricity\nEvery hour\nFor one month\nAt different prices during peak and off-peak hours\nAcross a specific transmission node\nWith market price exposure\nRequiring invoices and accounting entries\nManaging this in spreadsheets would be impractical and error-prone.\nEndur automates all of this.\nProblems without Endur\nImagine a trading company handling:\n10,000 trades per day\nHundreds of counterparties\nMultiple ISOs (ERCOT, PJM, CAISO, etc.)\nMultiple currencies\nMultiple commodities\nComplex pricing formulas\nThousands of invoices every month\nWithout an ETRM system, they would face:\nManual spreadsheets\nIncorrect pricing"
},
{
"s": "Endur notes workbook: Endur",
"o": 0,
"q": "Endur: Settlement errors",
"a": "Settlement errors\nMissed invoices\nCredit limit violations\nInaccurate P&L\nAudit and compliance challenges\nEndur centralizes and automates these processes.\nWho uses Endur?\nTypical users include:\nFront Office\nEnergy Traders\nDeal Originators\nPortfolio Managers\nThey enter and negotiate trades.\nMiddle Office\nRisk Analysts\nMarket Risk Teams\nCredit Risk Teams\nThey monitor exposure and compliance.\nBack Office\nSettlement Analysts\nAccounting Teams\nInvoice Specialists\nThey generate invoices, settlements, and accounting entries."
},
{
"s": "Endur notes workbook: oil, gas",
"o": 0,
"q": "oil, gas: Upstream | Midstream | Downstream",
"a": "Upstream | Midstream | Downstream\nETRM | Exploration & Extraction | Storage, Transport | Refining , Storage, Transport\nGas Processing\nLNG\nGlobal crude benchmark\nBrent | light sweet | N1 | N2\nWTI | sweet\nArabic | sour\nPurchase | Transit Deal | Sale deal\nTrade Date | 2026-04-11 00:00:00\nGrade | HSO\nQuantity | 1000 bbl\nDSD | 2026-05-01 00:00:00\nDED | 2026-05-31 00:00:00\nLocation Types\nCross Border\nVTP | Virtual Trading Point\nTerminal\nSub Terminal\nTSO | Transmission System Operator\nPipeline | UK\nZone | TSO | National Grid\nLocation | VTP | National Balancing Point"
},
{
"s": "Endur notes workbook: Power",
"o": 0,
"q": "Power: Ask",
"a": "Ask\nBid\nTrade date | 2026-04-10 00:00:00\nPeak | Day Ahead | Month Ahead | Intraday | Delivery | 2026-08-01 00:00:00 | EOD Date | 2026-04-12 00:00:00\nOff peak | Time | 00:00:00 | 01:00:00 | 02:00:00 | 03:00:00 | 04:00:00 | 05:00:00 | 06:00:00 | 07:00:00 | 08:00:00 | 09:00:00 | 10:00:00 | 11:00:00 | 12:00:00 | 13:00:00 | 14:00:00 | 15:00:00 | 16:00:00 | 17:00:00 | 18:00:00 | 19:00:00 | 20:00:00 | 21:00:00 | 22:00:00 | 23:00:00\nBL | Qty | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10\nTrade Date | 2026-04-10 00:00:00 | Trade Date | 2026-04-10 00:00:00 | Forward Price | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5\nDelivery date | 2026-04-14 00:00:00 | Delivery date | 2026-08-01 00:00:00 | Realized PNL\nQty | 10 | mwh | Qty | 10 | mwh | Unrelaized PNL | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115\nconfirm Date | 2026-04-13 00:00:00 | confirm Date | 2026-07-31 00:00:00 | MTM | 2760"
},
{
"s": "Endur notes workbook: Power",
"o": 0,
"q": "Power: Actual Aqt | 10 | mwh | Actual Aqt | 10 | mwh | VAR PNL | 25 | USD",
"a": "Actual Aqt | 10 | mwh | Actual Aqt | 10 | mwh | VAR PNL | 25 | USD\nTrade date | 2026-04-10 00:00:00\nSettlement Price | Forward Price | Delivery | 2026-08-01 00:00:00 | EOD Date | 2026-08-01 00:00:00\nTodays Date | 2026-04-14 00:00:00 | Price Source | Bloomberg, Platts | Time | 00:00:00 | 01:00:00 | 02:00:00 | 03:00:00 | 04:00:00 | 05:00:00 | 06:00:00 | 07:00:00 | 08:00:00 | 09:00:00 | 10:00:00 | 11:00:00 | 12:00:00 | 13:00:00 | 14:00:00 | 15:00:00 | 16:00:00 | 17:00:00 | 18:00:00 | 19:00:00 | 20:00:00 | 21:00:00 | 22:00:00 | 23:00:00\nPrice Source | ERCOT | Qty | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10\nSettlement Price | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5 | 11.5\nUnrealized | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0\nRealized PNL | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115 | 115\nPhysical Settlement | Cash Settlement | MTM | 0"
},
{
"s": "Endur notes workbook: Power",
"o": 0,
"q": "Power: Qty | 240 | MWH | Fixed Price | 10 | USD",
"a": "Qty | 240 | MWH | Fixed Price | 10 | USD\nIndex | 11 | USD | PNL | -2400 | USD\nPNL | 2640\nPortfolio\nFee | Stike Price | 100 | Live Trade\nFuel Cost | 100 | USD | Infosys | 10 | 110\n2400 | USD | Qty | 1 | 110 | Deal 1\n1 | 110 | Deal2\nNet | 2300 | USD\nMTM | 220\nVolume | Volume Type\nDeal num | Tran num | Ins num | Int BU | Int LE | Portfolio | Ext BU | Ext LE | Qty | Trade Price | Index | 09:00:00 | 10:00:00 | 11:00:00 | 12:00:00 | 13:00:00 | 14:00:00 | 15:00:00 | 16:00:00 | 17:00:00 | 18:00:00 | 19:00:00 | 20:00:00 | Trading\n21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334\n21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334"
},
{
"s": "Endur notes workbook: Power",
"o": 0,
"q": "Power: 21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_",
"a": "21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334\n21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334\n21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334\n21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334"
},
{
"s": "Endur notes workbook: Power",
"o": 0,
"q": "Power: 21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_",
"a": "21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334\n21232 | 21232 | 21232 | BG-BU | BG-LE | BG-Power-Phys | SP-BU | SP-LE | 600 | 25 | Ev_Pwr_Phys | 25 | 25.5 | 23.55 | 22.12 | 20.3433333333333 | 18.6533333333333 | 16.9633333333333 | 15.2733333333333 | 13.5833333333333 | 11.8933333333333 | 10.2033333333333 | 8.51333333333334"
},
{
"s": "Endur notes workbook: Terminologies",
"o": 0,
"q": "Terminologies: Market | Toolset | Base Instrument | User defined Instrument",
"a": "Market | Toolset | Base Instrument | User defined Instrument\nPhysical | Commodity | Comm-Phys | Pwr-Phys, Gas-Phys\nPhysical | Commodity | Comm-Stor | Gas-Stor, Oil-Stor\nPhysical | Commodity | Comm-Trans | Gas-Stor, Oil-Stor\nFinancial | Fut | Comm-Fut | Pwr-Fut, Oil-Fut, Gas-Fut\nFinancial | Forwards | Comm-Fut | Pwr-Fut, Oil-Fut, Gas-Fut\nFinancial | Options | Comm-Opt | Pwr-Opt-Call, Pwr-Opt-Put\nFinancial | Comm-Swap | Comm-Swap | Pwr-Swap, Gas-Swap\nTran Status\nPending | Full Deal info not entered\nNew | Non Approved Status\nValidated | Live Deal\nAmended | Making changes\nCancelled\nDeleted\nMatured\nTemplate\n2026-04-14 00:00:00\ncd | Calender day | 5cd\ngbd | Good business day | 20cd>1eom\neom | End of month\nlom | Last of month\nfoy | First of year\nloy | Last of year\nfoq | First of quarter"
},
{
"s": "Endur notes workbook: Endur Managers",
"o": 0,
"q": "Endur Managers: Si. Num | Endur Managers:",
"a": "Si. Num | Endur Managers:\n1 | Trading Manager | Users can enter trades, retrieve and view existing trades, Run ad-hoc simulations\n2 | Reference Manager | It defines the structures of internal and external entities\n3 | Market Manager | It is used to define, modify and view prices, rates, volatilities and correlations. It stores index definition used in the system. Indexes are composed of grid points and prices for different time periods\n4 | Admin Manager | It's used to perform various administrative tasks in the system such as password administration, assign security privileges, system configuration and mantenance of static data.\n5 | Services Manager | It allows user to create, maintain and monitor server nodes, workflows, application services, the grid, connex services and connex grids\n6 | Operations Manager | Performs multiple trade administration and back office tasks. It contains 3 tabs.\nA. Daily Operaions:\nB. Management:\nC. Services:"
},
{
"s": "Endur notes workbook: Endur Managers",
"o": 0,
"q": "Endur Managers: 7 | Credit and Risk Manager | Credit and risk managers are used to control and monitor cou",
"a": "7 | Credit and Risk Manager | Credit and risk managers are used to control and monitor counterparty credit and trading position limits. Each organization can establish a range of limits by any number of catogories including, but not limitied to counterparty, trader, business unit, instrument, contract type.\nCredit risk arises when counter parties are unwilling or unable to fulfill their contractual obligations.\nMarket risk arises from changes in the prices and volatilies of assets and liabilities\nCredit manager is used to control and monitor credit risk. Risk manager is used to control and monitor the Market risk.\nCounterparty credit lines are established in the credit manager, while trading limits are established in the risk manager."
},
{
"s": "Endur notes workbook: Booking a trade",
"o": 0,
"q": "Booking a trade: trayport | Kafka/ WebTrader | Endur | Pending screens",
"a": "trayport | Kafka/ WebTrader | Endur | Pending screens\ncontract name: abcd1234 | Deal: abcd1234 | Deal Number: 1235 | 123 | Simulations\npwr-Phys | Deal: abcd1234 - > 1235\n100MWh\nhyderabad from bangalore"
},
{
"s": "Endur notes workbook: Trade life cycle using managers",
"o": 0,
"q": "Trade life cycle using managers: Reference Manager",
"a": "Reference Manager\n│\n├── Business Units\n├── Counterparties\n├── Portfolios\n├── Commodities\n├── Locations\n└── Calendars\n│\n▼\nMarket Manager\n│\n├── Curves\n├── Prices\n├── FX\n├── Interest Rates\n└── Volatility\n│\n▼\nAdmin Manager\n│\n├── Users\n├── Roles\n├── Permissions\n├── Workflows\n└── Interfaces\n│\n▼\nTrading Manager\n│\n├── Enter Trade\n├── Validate\n├── Save\n└── Trade Number\n│\n▼\nCredit & Risk Manager\n│\n├── Credit Check\n├── Exposure\n├── P&L\n├── MTM\n└── VaR\n│\n▼\nOperations Manager\n│\n├── Validate Trade\n├── Schedule\n├── Confirm\n├── Generate Events\n└── Prepare Settlement\n│\n▼\nServices Manager\n│\n├── Background Jobs\n├── EOD\n├── Market Data Load\n├── Settlement Generation\n├── Invoice Generation\n└── Accounting Generation\n│\n▼\nSettlement\n│\n├── Data Load Script\n├── Generation Script\n├── Output Script\n├── Crystal/DMS Report\n└── Invoice PDF\n│\n▼\nAccounting\n│\n├── Journal Entries\n├── GL Mapping\n├── SAP/Oracle Export\n└── Financial Reporting"
},
{
"s": "Endur notes workbook: Reference manager",
"o": 0,
"q": "Reference manager: Reference Manager",
"a": "Reference Manager\nIt defines the structures of internal and external entities. Each entity usually consists of following elements\nParties: | Represents the internal groups within an organization and external groups such as counterparties and brokes\nLegal Entity: | A Legal Entity is the legal company that enters into contracts and is legally responsible for trades\nBusiness Unit: | A Business Unit (BU) is an organizational division within a Legal Entity. It groups users and portfolios based on business functions.\nPersonnel: | Employees/ Contacts within the parties\nPortfolios: | Accounts for which the internal parties trade\nAccounts: | it contains banking and settle information of party\nSettlement instructions: | Tell the system how to settle each instrument in the currency and commodity trade.\nParty Agreement: | Defines the legal and operation agreement between two parties that governs how trades are executed, confirmed, settled and invoiced\nAgreement Conditions: | These are the detailed business and operational rules associated with a party agreement that define how trades under that agreement are confirmed, invoiced, settled, netted and credit checked."
},
{
"s": "Endur notes workbook: Reference manager",
"o": 0,
"q": "Reference manager: Agreement Language: | It stores the legal text, clauses and standard wording associated wi",
"a": "Agreement Language: | It stores the legal text, clauses and standard wording associated with a party agreement.\nLegal Entity | Legal Entity | Inside the Power Trading Business Unit:\n│ | │\n├── Business Unit 1 | ├── Power Trading BU | Portfolio | Purpose\n│ │ | ├── Gas Trading BU | CA Power | California power trades\n│ ├── Portfolio A | ├── Risk BU | PJM Power | PJM market trades\n│ ├── Portfolio B | └── Renewable BU | ERCOT | Texas power\n│ └── Portfolio C | Short Term | Day-ahead trading\n│\n├── Business Unit 2\n│ │\n│ ├── Portfolio D\n│ └── Portfolio E\n│\n└── Business Unit 3\n│\n└── Portfolio F\nOverall Relationship\nEndur Core Table\nMain Tables | other or history tables\nparty | party_*\nbusiness_unit | business_unit_*\nlegal_entity | legal_entity_*\npersonnel | personnel_*\nportofolio | portofolio_*\naccounts | account_*\nsettle_instructions | settle_instructions_*\nparty_agreement | party_agreement*\nagreement_view | agreement_language*\nAPI | Ref.*"
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Market Manager",
"a": "Market Manager\nIt is used to define, modify and view prices, rates, volatilities and correlations. It stores index definition used in the system. Indexes are composed of grid points and prices for different time periods\nIndexes, Volatilities, and Correlations are all market data objects, but they serve different purposes in pricing, valuation, and risk calculations.\nAspect | Index | Volatility | Correlation\nDefinition | Represents the market price or forward curve of a commodity or financial instrument. | Measures how much the price of an index is expected to fluctuate over time. | Measures how two market variables move relative to each other.\nStores | Spot prices, forward prices, settlement prices. | Volatility percentages (e.g., 25%, 30%). | Correlation coefficient (-1 to +1).\nPurpose | Used to price trades and calculate MTM/PnL. | Used to price options and calculate option Greeks. | Used in portfolio risk, VaR, and cross-commodity option pricing.\nTypical Value | $3.50/MMBTU | 0.28 | 0.85\nUsed By | Futures, Swaps, Physical Deals | Options | Risk Analytics, Portfolio Optimization\nMaintained In | Market Manager → Indexes | Market Manager → Volatility | Market Manager → Correlations"
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Summary of Price Usage Through the Deal Lifecycle",
"a": "Summary of Price Usage Through the Deal Lifecycle\nStage | How Price is Used\nMarket Data Load | Creates the forward curve in Market Manager. | 100M\nDeal Capture | Trade references an index (e.g., NG_NYMEX); no fixed price yet for floating trades. | july | 100MWH | nG-NYMEX | 3.2 | 320\nPrice Fixing | Retrieves the market price from the index curve and records it as the deal's fixing. | aug | 100MWH | nG-NYMEX | 3.4 | 340\nMark-to-Market (MTM) | Uses current forward prices for unfixed periods and fixed prices for already-fixed periods. | sept | 100MWH | nG-NYMEX | 3.6 | 360\nPnL | Measures gains or losses based on changes in market prices and fixed prices. | realized\nRisk | Uses market prices and fixings to calculate exposure and sensitivities.\nSettlement | Calculates payable/receivable amounts using the fixed price or average fixed price.\nInvoice Generation | Uses the settlement amount derived from the fixed price.\nAccounting | Creates accounting entries based on the settled amount.\nField | Value | Description | Used\nIndex Name | NG_NYMEX | Internal name of the index. | Used internally by Endur to uniquely identify the index in pricing, scripting, market data, and database references."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Label | NG NYMEX-CME | Display name shown to users. | Used in the UI, reports, deal screen",
"a": "Label | NG NYMEX-CME | Display name shown to users. | Used in the UI, reports, deal screens, and market data screens for user-friendly identification.\nMarket | Commodities | Market category. | Used to classify the index under a market (Commodities, FX, Interest Rates, etc.) for filtering and organization.\nGroup | Natural Gas | Commodity group. | Used to group similar indexes together for reporting, curve management, and market data organization.\nSub Group | None | Optional classification. | Used when further categorization of indexes is required (e.g., regional gas markets).\nFormat | Price | Indicates that the index stores price values. | Used by pricing engines and market data loaders to determine the type of values stored.\nPurpose | Trading | Indicates the intended use of the index. | Used during deal capture, valuation, risk, and settlement calculations.\nClass | Date-based Fwd | Indicates this is a forward curve indexed by dates. | Used when building forward curves and mapping prices to contract delivery dates. | Property | Value"
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Secured Index | No | Indicates whether the index is security protected. | Used by administ",
"a": "Secured Index | No | Indicates whether the index is security protected. | Used by administrators to restrict modification of important market indexes. | Date Sequence | 1ng\nDelivery Unit | MMBTU | Quantity unit for natural gas. | Used in scheduling, settlements, invoicing, and trade quantity calculations.\nPrice Unit | MMBTU | Price quoted per MMBTU. | Used during pricing, PnL calculations, and unit conversions.\nBase Currency | USD | Currency of the index. | Used in valuation, accounting, PnL, and FX conversion calculations.\nHoliday Schedule | NYMEX | Calendar used for business day calculations. | Used when determining contract dates, settlement dates, pricing dates, and payment dates.\nDays Delayed | 0 | Indicates no market data delay. | Used by market data interfaces to determine whether delayed prices should be used.\nContract Size | 10000 | One NYMEX NG futures contract represents 10,000 MMBTU. | Used when converting futures lots into physical quantities for pricing, risk, and settlement.\nGamma Factor | 1 | Multiplier used in certain pricing models. | Used primarily in advanced pricing and options valuation models."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Std Tenor | n/a | No standard tenor defined. | Used when generating standard maturity buck",
"a": "Std Tenor | n/a | No standard tenor defined. | Used when generating standard maturity buckets for indexes such as monthly, quarterly, or yearly curves.\nDate Sequence | 1ng | Defines how contract dates are generated for the index. | Used while building forward curves and determining contract months. | july1 | 10\nOption Date Seq | 1ngo | Date sequence used specifically for option expiration dates. | Used when pricing options on this index. | aug1 | 20\nPayment Convention | Mod. Follow | Business day adjustment rule for payment dates. If payment falls on a holiday, it moves to the next business day unless it crosses the month. | Used during settlement and invoicing. | 30 | 31 | 29\nConversion Factor | 1 | Multiplier applied to market prices before storing or using them. | Useful when market data provider units differ from trading units.\nCoverage End Date | 11y | Maximum forward horizon of the index (11 years). | Controls how far the forward curve can extend.\nInterpolation | Back-Step | Method for filling missing price points. Back-Step carries the previous available price forward. | Used during curve construction when some maturities are missing."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Discount Index | SWAP_RATE.USD | Interest rate curve used to discount future cash flows. |",
"a": "Discount Index | SWAP_RATE.USD | Interest rate curve used to discount future cash flows. | Used in MTM, PnL, and valuation calculations.\nUse Exp Contract | No | Determines whether expired contracts remain usable. | Mainly affects historical pricing and valuation. | 6.12342354 | 6.12342\nRounding | 5 | Number of decimal places retained for prices. | Used during pricing and reporting. | 6.12342854 | 6.12343\nReference Source | NYMEX | Exchange or market from which prices originate. | Used by market data interfaces and documentation.\nInput Style | Cluster | Specifies how market data is organized for the curve. | Used during market data loading.\nProduct Delivery Type | NatGas | Commodity delivery type associated with the index. | Used in scheduling and settlement logic.\nComponent | Fixed Px | Indicates the component represents a fixed price. | Used in pricing models and trade pricing.\nAvg Period (d) | 1 | Number of days used when averaging prices. | Daily index = 1; monthly averages would use higher values.\nBought Currency | USD | Currency in which the commodity is purchased. | Used in settlements and accounting."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Time Zone | None | Time zone applicable to market prices. | Important for intraday markets",
"a": "Time Zone | None | Time zone applicable to market prices. | Important for intraday markets; less relevant for daily settlements.\nPrice Band | None | Defines acceptable price limits for validation. | Prevents loading abnormal prices.\nDensity Adjustment | 1 | Factor used when converting between volume and energy units. | Mainly used for oil and gas products.\nProjection Method | NYM_L1D | Algorithm used to project the forward curve. | Used when constructing missing forward prices.\nDelta Optimization | Yes | Optimizes sensitivity (delta) calculations. | Used in Risk and PnL calculations.\nOutput Delta Shift | 0.0001 | Small price shift applied when calculating delta using finite differences. | Used in risk calculations.\nDay Start Time | 00:00:00 | Beginning of the trading day. | Used for daily market data processing.\nConstruction Method | Standard | Method used to build the index curve. | Standard method for most commodity curves.\nUse Separate BMO | No | Indicates whether a separate Balance Month Opening curve is maintained. | Mostly used for specialized power and gas markets.\nType | Standard | Type of index definition. | Standard indicates a normal market index."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: ID | 1020002 | Internal database identifier. | Used internally by Endur.",
"a": "ID | 1020002 | Internal database identifier. | Used internally by Endur.\nVersion ID | 1020813 | Version number of the index definition. | Tracks changes made to the index configuration.\nStatus | Official | Indicates this is the active production version. | Only official indexes are typically used for trading.\nVersion Status | Validated | Shows the index has passed validation checks. | Required before promotion to production.\nSecure | No | Indicates whether the index is protected from unauthorized changes. | Used in environments with strict governance.\nDefinition Modified | No | Indicates whether there are unsaved changes. | Helps identify pending modifications.\nIs Suspended | No | Indicates whether the index is disabled. | Suspended indexes cannot normally be used for pricing.\nSuspended Status | UNKNOWN | Displays suspension state. Since the index is active, this has no effect. | Used only if the index is suspended.\nTemplate Index | None | Parent template from which the index inherits settings. | Used when multiple indexes share common configurations."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Price Input Priority | Low | Priority assigned to market data inputs for this index. | Use",
"a": "Price Input Priority | Low | Priority assigned to market data inputs for this index. | Used when multiple price feeds exist for the same market.\nTypes of Indexes in Endur\nIndex Type | Description | Example | Used For\nSpot Index | Stores the current market (spot) price for immediate delivery. | Henry Hub Spot | Spot transactions, same-day pricing.\nForward Index (Date-based Forward) | Stores prices for future delivery periods. | NG_NYMEX, BRENT | Futures, swaps, MTM, PnL.\nCash Index | Stores daily cash settlement prices. | Daily Gas Index | Physical gas and power settlements.\nAverage Index | Calculates the average price over a specified period. | Monthly Average Gas Price | Floating-price contracts with monthly averaging.\nSettlement Index | Stores official exchange settlement prices. | NYMEX Settlement | Daily settlement and valuation.\nFX Index | Stores foreign exchange rates. | USD/INR, EUR/USD | Currency conversion and multi-currency valuation.\nInterest Rate Index | Stores interest rates and yield curves. | SOFR, LIBOR, SWAP_RATE.USD | Discounting and financing calculations.\nVolatility Index | Stores implied or historical volatility values. | NG Volatility | Option pricing."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Correlation Index | Stores correlation coefficients between two indexes. | NG vs Power Cor",
"a": "Correlation Index | Stores correlation coefficients between two indexes. | NG vs Power Correlation | Portfolio risk and VaR.\nTypes of Prices in Endur\nMarket data providers can load different price types for the same index.\nPrice Type | Description | Example | Used For\nBid Price | Highest price buyers are willing to pay. | 3.48 | Trading and market analysis.\nAsk (Offer) Price | Lowest price sellers are willing to accept. | 3.52 | Trading and market analysis.\nMid Price | Average of Bid and Ask. | 3.5 | MTM and valuation.\nLast Traded Price | Price of the most recent trade. | 3.49 | Market reference.\nSettlement Price | Official closing price published by the exchange. | 3.51 | Daily MTM, PnL, settlements.\nClosing Price | Price at market close. | 3.5 | Reporting and valuation.\nOpening Price | First traded price of the day. | 3.4 | Market analysis.\nHigh Price | Highest traded price during the day. | 3.6 | Market analysis.\nLow Price | Lowest traded price during the day. | 3.35 | Market analysis.\nAverage Price | Average price over a period. | 3.47 | Monthly average contracts."
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Official Price | Official price published by the exchange or pricing agency. | CME Officia",
"a": "Official Price | Official price published by the exchange or pricing agency. | CME Official Settlement | Regulatory reporting and settlements.\nPrice Type | Definition | Source | Used For | Example\nClosing Price | The official market price at the close of the trading day. | Exchange (e.g., CME, NYMEX, ICE) | Daily MTM, PnL, EOD valuation, settlements | NG_NYMEX Closing Price on 10-Jul-2026 = 3.52 USD/MMBTU\nUniversal Price | A standardized price maintained in Endur that can be used across multiple business processes, regardless of the original market data source. It is often the \"active\" price selected for valuation. | Endur Market Manager (loaded or derived) | Trade pricing, MTM, risk calculations, reporting | Universal Price for NG_NYMEX Jul-26 = 3.52 USD/MMBTU\nHistorical Price | A previously stored price for a specific business date. Historical prices never change once stored. | Endur Historical Market Data | Backdated valuation, audit, historical PnL, simulations | Historical Price on 01-Jul-2026 = 3.40 USD/MMBTU\nCore tables | Other tables\nidx_def | idx_*\nidx_historical_prices | index_*\nAPI\ntableName = Index.LoadAllGpts(indexID)"
},
{
"s": "Endur notes workbook: Market Manager",
"o": 0,
"q": "Market Manager: Index.updateGpts(int indexID, table tableName, BMO_ENUMERATION bmo, int save_universal, in",
"a": "Index.updateGpts(int indexID, table tableName, BMO_ENUMERATION bmo, int save_universal, int save_close, int close_date, int closing_dataset_id);"
},
{
"s": "Endur notes workbook: Credit Manager",
"o": 0,
"q": "Credit Manager: Credit Manager",
"a": "Credit Manager\nWhat is Credit Manager in Endur?\nCredit Manager is used to monitor and control counterparty credit exposure.\nIt helps answer questions like:\nHow much credit limit is assigned to a counterparty?\nHow much of that limit has been utilized?\nWill a new trade exceed the limit?\nWhich counterparties have violated their limits?\nWhat is a Credit Rating?\nA credit rating indicates the financial strength of a counterparty and its ability to meet its financial obligations.\nExamples:\nRating | Meaning | Risk\nAAA | Extremely strong | Very Low\nAA | Very strong | Very Low\nA | Strong | Low\nBBB | Adequate investment grade | Medium\nBB | Speculative | High\nB | Highly speculative | Very High\nCCC | High risk of default | Extremely High\nD | Default | Defaulted\nHow is a Rating Determined?\nRating agencies evaluate factors such as:\n1. Financial Strength\nRevenue\nProfitability\nCash flow\nNet worth\nExample:\nAnnual Revenue: $15 Billion\nNet Profit: $2 Billion\nHealthy cash reserves\n→ Likely to receive a high rating.\n2. Debt Levels\nThey analyze:\nTotal debt\nDebt-to-equity ratio\nInterest coverage\nLower debt generally supports a better rating.\n3. Liquidity\nCan the company pay its short-term obligations?"
},
{
"s": "Endur notes workbook: Credit Manager",
"o": 0,
"q": "Credit Manager: Factors include:",
"a": "Factors include:\nCash on hand\nWorking capital\nCurrent ratio\n4. Payment History\nQuestions considered:\nHas the company defaulted before?\nDoes it pay suppliers on time?\nHas it missed loan payments?\nA strong payment history improves the rating.\n5. Industry Risk\nSome industries are inherently riskier.\nExample:\nIndustry | Typical Risk\nGovernment | Low\nUtilities | Low\nOil & Gas | Medium\nStartups | High\n6. Market Conditions\nEconomic events can influence ratings.\nFor example:\nFalling oil prices may affect energy companies.\nEconomic recessions can weaken financial performance.\nEndur does not calculate credit ratings. Ratings are obtained from external rating agencies (such as S&P, Moody's, or Fitch) or assigned by an organization's internal credit risk team.\nEndur stores and uses those ratings, along with configured credit facilities and limits, to monitor counterparty exposure and enforce credit policies."
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: Admin Manager",
"a": "Admin Manager\nTab | Purpose | Typical Users\nGeneral Administration | Global system configuration | System Admin\nCompliance | Security, audit, licensing | Security/Admin\nData Model Extension | Business master data & customizations | Functional Consultant/Developer\nEnergy Administration | Energy-specific configuration | Energy Consultant\nSystem Administration | Technical administration | Technical Admin\n1. General Administration\nThis tab contains configurations used throughout the entire Endur system.\nAFE Arguments\nConfigure parameters for AFE (Authorization For Expenditure)\nUsed in project costing.\nALM Manager\nAsset Liability Management configuration.\nMainly used in banking implementations.\nAuto Document Release\nAutomatically releases generated confirmations/invoices.\nEliminates manual release.\nExample\nTrade Confirmed\n↓\nConfirmation Generated\n↓\nAutomatically Released\nBroadcast Channel Administration\nControls:\nMarket data broadcast\nNotification channels\nDistribution services\nConfigure Trade Blotter Links\nControls hyperlinks inside Trading Manager.\nExample\nDouble-click Trade\n↓\nOpen Position Report\n↓\nOpen Settlement Report\nDate Sequence\nMaintains system calendars.\nExamples\nBusiness Day"
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: Holiday",
"a": "Holiday\nTrading Day\nMonth End\nQuarter End\nFX Manager\nCurrency conversion configuration.\nStores\nFX Rates\nCurrency relationships\nInstrument Type Default Templates\nDefault values when creating trades.\nExample\nGas Trade\n↓\nAutomatically populate\nPipeline\nVolume Unit\nPricing Formula\nLink Screen Config Definitions\nControls navigation between screens.\nExample\nTrade\n↓\nOpen Counterparty\n↓\nOpen Portfolio\nMDO Setup\nMarket Data Objects configuration.\nUsed for\nCurves\nVolatility\nCorrelation\nForward curves\nPerformance Measurement\nPerformance KPI calculations.\nUsed for\nTrader Performance\nPortfolio Performance\nPortfolio Groups\nLogical grouping of portfolios.\nExample\nNorth America\n├── CAISO\n├── ERCOT\n└── PJM\nPPA Configuration\nPower Purchase Agreement settings.\nPrinter Setup\nCrystal Report printers.\nInvoice printers.\nConfirmation printers.\nProjection Method\nForecast methods.\nUsed for\nLoad Forecast\nProduction Forecast\nPurge Configuration\nControls archival and database cleanup.\nDeletes\nOld Events\nLogs\nSimulation Results\nAudit records\nQuery Setup\nStores Saved Queries.\nExample\nMy Trades\nToday's Deals\nPhysical Deals\nResult Type Groups\nSimulation grouping.\nExample\nRisk Results\nExposure Results\nPnL Results"
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: Static Data",
"a": "Static Data\nLaunches Reference Manager.\nContains\nParties\nPortfolios\nAccounts\nAgreements\nPipelines\nLocations\nProducts\nStructured Fees\nConfiguration of structured fee models.\nSystem Wide Configuration\nGlobal parameters.\nExamples\nBusiness Date\nTimezone\nBatch Jobs\nSimulation Parameters\nWorkflow defaults\nUnit Conversion\nConfigure conversion factors.\nExamples\nMMBTU ↔ GJ\nBarrel ↔ Gallon\nMW ↔ MWh\n2. Compliance\nSecurity and audit management.\nComponent Verification\nChecks installed modules.\nError Log Viewer\nDisplays\nApplication errors\nStack traces\nExceptions\nExternal Apps Registration\nRegisters external systems.\nExample\nSAP\nWorkday\nCustom REST API\nHistory View\nShows historical changes.\nExample\nPortfolio changed\nCounterparty modified\nAgreement updated\nLDAP Configuration\nActive Directory integration.\nProvides\nSingle Sign-On\nWindows authentication\nLicensing\nDisplays installed Endur licenses.\nPassword Administration\nPassword policies.\nMinimum length\nExpiry\nComplexity\nSecurity Groups\nRole Based Access Control.\nExample\nTrader\nScheduler\nRisk\nSettlement\nAdmin\nSystem Audit Log\nTracks\nWho\nWhat\nWhen\nExample\nUser\nModified Portfolio\nTime\n10:35:00\nSystem Shutdown\nGraceful application shutdown."
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: 3. Data Model Extension",
"a": "3. Data Model Extension\nThis is one of the most frequently used areas for Endur consultants and developers.\nIt contains business master data definitions.\nAgreement Info\nAgreement extensions.\nBack Office Document Info\nConfirmation fields.\nInvoice fields.\nBalance Circle Info\nGas balance circles.\nCargo Info\nLNG/Oil cargo information.\nCashflow Info\nCashflow extensions.\nConstraint Info\nScheduling constraints.\nCredit & Risk Limit Info\nCredit extension fields.\nDelivery Ticket Info\nPhysical delivery tickets.\nEvent Notifications\nNotification templates.\nExtensions\nCustom Data Model Extensions (DME).\nMost frequently used for custom fields.\nFacility Info\nStorage facilities.\nPlants.\nFee Info\nFee extensions.\nIndex Info\nMarket index extensions.\nInstrument Builder\nOne of the most important modules.\nUsed to:\nCreate custom instruments\nDefine deal structures\nConfigure transaction layout\nBuild commodity products\nLocation Info\nDelivery locations.\nHubs.\nNodes.\nNomination Info\nPipeline nominations.\nParcel Info\nOil/LNG parcel definitions.\nParty Info\nCounterparty extensions.\nPayment Formula Variable Type Definitions\nFormula variables.\nPersonnel Info\nEmployee master data.\nPipeline Info\nPipeline extensions."
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: Portfolio Info",
"a": "Portfolio Info\nPortfolio custom fields.\nPower Delivery Info\nPower scheduling.\nPricing Model Configuration\nPricing engine configuration.\nProducer Services Info\nPower producer services.\nReference Alias\nAlias names.\nExample\nNYMEX = Henry Hub\nScript Addins\nRegisters\nOpenJVS\nOpenComponents\nJava plugins\nSI/Account Info\nSettlement Instruction extensions.\nSimulation Result Configuration\nControls simulation output.\nExamples\nPnL\nVaR\nGreeks\nExposure\nTran Info\nAdd custom trade fields, access via OpenJVS/OpenComponents, use in reports and workflows\nTran Info\nAdd custom trade fields, access via OpenJVS/OpenComponents, use in reports and workflows\nUser Tables\nStore custom reference data, query from scripts and reports\nUser Pick Lists\nPopulate dropdowns and validate user input\nUser Data Worksheet\nStore multiple custom records linked to trades or reference data\nVolatility Info\nExtend market risk and options data for pricing and simulation\nData Series Info\nExtend time-series market data such as prices, weather, and forecasts\n4. Energy Administration\nSpecific to Energy Trading & Risk Management.\nAdjustment Groups"
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: Define set of rules for generating price adjustments based on differences between contract",
"a": "Define set of rules for generating price adjustments based on differences between contracted and delivered qualities of commodity.\nBalance Circle\nUsed to set up balance circle and balance circle assignment related to the control area and busines units\nChained Paths\nPipeline routing.\nCommodity Delivery\nCommodity Delivery information is set up here like Pipeline, zone, location, facilities, valuation pool etc\nCycle Dates\nNomination cycles.\nExamples\nTimely\nEvening\nIntraday\nElectricity Delivery\nPower delivery configuration. like Regions, Balancing Area/TR Provider, sub balancing area, locations, inter-connects, loacation type, transimissions, chained paths etc.\nEnergy Conversion\nEnergy conversion factors used to convert units of energy to volume within a specified date range\nFee Type Definitions\nused to set up various fee types of fees that can be associated with physical deals.\nHedge Script\nUsed to assign a plug-in/script to a toolset. The trading manager processed this script when hedging a toolset.\nIndex Location\nMaps market indexes to delivery locations.\nMeasure Groups\nMeasurement units.\nNERC Registry Table\nNorth American Electric Reliability Corporation data.\nPower Operator"
},
{
"s": "Endur notes workbook: Admin Manager",
"o": 0,
"q": "Admin Manager: Power operators.",
"a": "Power operators.\nPrice Bands\nPrice limits.\nProducts\nCommodity products.\nExamples\nPower\nGas\nOil\nCoal\nEmissions\nRate Definitions\nTransportation rates.\nRollover Conventions\nContract roll logic.\nTank Gauges\nStorage tank information.\nTime Zone Definition\nDefines trading time zones.\nTransport Agreement Contracts\nPipeline transport contracts.\nUser Defined Paths\nCustom delivery paths.\nVolume Type Definitions\nExamples\nActual\nForecast\nScheduled\nNominated\n5. System Administration\nTechnical administration.\nAdHoc Query\nExecute SQL queries directly from Endur (subject to permissions).\nGUI Modules Configuration\nConfigure screens and menus.\nImport Script Packages\nImport:\nOpenJVS packages\nOpenComponents packages\nScripts\nPlugins\nTest Workbench\nTesting environment for scripts and plugins.\nPlugin Bulk Export\nExport plugins.\nPlugin Bulk Import\nImport plugins into another environment.\nCommonly used for DEV → TEST → UAT → PROD deployments.\nPlugin Editor\nCreate and edit:\nOpenJVS plugins\nOpenComponents scripts\nJava plugins\nEvent scripts"
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is Endur?",
"a": "Endur (by ION Commodity) is a leading ETRM (Energy Trading & Risk Management) platform used by energy companies to manage the full trade lifecycle — from deal capture to settlement, risk, and P&L."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What does ETRM stand for?",
"a": "Energy Trading & Risk Management. ETRM systems manage trading operations, commodity risk, position tracking, scheduling, and financial settlement for energy markets."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What commodities does Endur typically cover?",
"a": "Natural gas, power/electricity, crude oil, refined products, LNG, coal, emissions, and financial derivatives across those markets."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is the Trade Lifecycle in Endur?",
"a": "Deal Capture → Confirmation → Scheduling → Risk/P&L → Invoicing → Settlement. Endur manages each stage across front, middle, and back office."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'deal' in Endur?",
"a": "A deal is any transaction entered into the system — physical commodity trades, financial derivatives, transport, or storage contracts. Each deal has attributes like commodity, counterparty, volume, and price."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is the Deal Booking screen used for?",
"a": "The primary interface for entering new trades into Endur. Traders input deal type, counterparty, commodity, quantity, price, and leg details."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'leg' in an Endur deal?",
"a": "A leg represents one side of a trade (e.g., buy or sell). A swap deal has two legs — a floating leg and a fixed leg."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What are deal types in Endur?",
"a": "Common deal types include: Phys (physical), Fin (financial/swap), FX, Option, Storage, Transport, and Loan/Deposit."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'reset' in Endur?",
"a": "A reset is a pricing event on a financial deal where the floating price is fixed using an index (e.g., NBP, Henry Hub) for a specific period."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is MTM (Mark-to-Market) in Endur?",
"a": "Mark-to-Market is the current fair value of open positions, calculated by comparing the contracted price against current market prices. It represents unrealised P&L."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'position' in Endur?",
"a": "A position is the net exposure from all open deals for a commodity in a given period — long (buy) or short (sell). Endur aggregates positions across deals."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is VaR in the context of Endur?",
"a": "Value at Risk — a statistical measure of the maximum potential loss over a given time period at a given confidence level (e.g., 95%). Endur's risk module calculates VaR across portfolios."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'price curve' in Endur?",
"a": "A forward price curve representing expected future prices for a commodity. Used for MTM valuation and risk calculations. Curves are loaded or generated daily."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a simulation in Endur?",
"a": "A scenario analysis tool that calculates portfolio value (P&L, risk) under different market conditions or price curve assumptions."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is the Nominations module?",
"a": "Handles physical scheduling — nominating volumes to pipelines, grids, or counterparties for physical delivery of gas, power, or oil."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is the Invoicing module in Endur?",
"a": "Generates invoices based on settled trades, volumes, and prices. It supports AP (accounts payable) and AR (accounts receivable) workflows."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is settlement in Endur?",
"a": "The process of confirming and finalising payment obligations. Endur matches deal terms, computes settlement amounts, and posts them to accounting/GL."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is 'confirmation matching'?",
"a": "The process of matching the terms of a trade with a counterparty's confirmation (e.g., via email, SWIFT, or electronic matching platforms) to confirm both sides agree."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'script' in Endur?",
"a": "Endur uses OpenJVS (Java-based) scripts to automate processes, customise workflows, and interface with external systems. Scripts are a core part of implementation."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is a 'batch' in Endur?",
"a": "A scheduled or on-demand automated job that performs system tasks: EOD (end-of-day) processing, curve loading, invoicing, position updates, or report generation."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "What is EOD (End of Day) processing in Endur?",
"a": "A batch run at the end of each trading day that locks prices, finalises positions, computes P&L and MTM, generates reports, and prepares data for the next business day."
},
{
"s": "ETRM flashcards",
"o": 0,
"q": "How does Endur integrate with external systems?",
"a": "Via APIs, flat files (CSV/XML), OpenJVS scripts, or middleware (e.g., MQ, REST). Common integrations: ETRM ↔ ERP (SAP), market data feeds, scheduling systems."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What types of AVS functionality would you not migrate?",
"a": "What interviewer is testing: Whether you understand that JVS is not simply “Java replacing AVS.”"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you approach an AVS → JVS migration?",
"a": "Your framework:\n\nInventory → Assess → Prioritise → Design → POC → Migrate → Test → Parallel Run → Cutover → Decommission"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "Would you migrate all AVS code?",
"a": "No. Classify into:\n\n* Retire\n* Retain\n* Migrate\n* Redesign"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you prioritise migration candidates?",
"a": "Consider:\n\n* Business criticality\n* Usage\n* Complexity\n* Dependencies\n* Change frequency\n* Performance\n* Risk\n* Test coverage"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "Would you start with the most critical AVS application?",
"a": "Usually not.\n\nStart with a representative low/medium-risk POC to establish patterns before tackling critical applications."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you divide migration into waves?",
"a": "Example:\n\n\nWave 0 → Discovery / POC\nWave 1 → Low-risk\nWave 2 → Medium complexity\nWave 3 → High complexity\nWave 4 → Critical applications\nWave 5 → Decommissioning"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you build an AVS inventory?",
"a": "Capture:\n\n\nComponent\nOwner\nBusiness function\nCaller\nDependencies\nEndur APIs\nDB access\nExternal systems\nFrequency\nCriticality\nComplexity\nTest coverage"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What types of dependencies can an AVS script have?",
"a": "Think:\n\n\nAVS\n├── Other AVS\n├── Endur APIs\n├── Database\n├── Configuration\n├── Reference data\n├── Market data\n├── Transactions\n├── Workflows\n├── Services\n├── Files\n└── External systems"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you avoid producing a “Java version of bad AVS code”?",
"a": "A strong answer:\n\n> “I would preserve business behaviour where required, but redesign the technical implementation where the old AVS architecture creates unnecessary coupling, poor performance or maintainability problems.”"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you establish an AVS performance baseline?",
"a": "Measure:\n\n* Execution time\n* API calls\n* DB calls\n* Memory\n* CPU\n* Volume\n* Concurrency"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What constitutes “same behaviour”?",
"a": "Don't limit it to the final number.\n\nConsider:\n\n\nInput\n↓\nCalculation\n↓\nOutput\n↓\nSide effects\n↓\nError handling\n↓\nPersistence"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What testing levels would you use?",
"a": "Unit\n ↓\nIntegration\n ↓\nSystem\n ↓\nRegression\n ↓\nPerformance\n ↓\nParallel validation\n ↓\nUAT\n ↓\nProduction validation"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you architect AVS/JVS parallel execution?",
"a": "Input\n │\n ┌────────┴────────┐\n ↓ ↓\n AVS JVS\n │ │\n ↓ ↓\n Result A Result B\n │ │\n └────────┬────────┘\n ↓\n Comparator"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What environments would you use?",
"a": "DEV\n ↓\nSIT\n ↓\nUAT\n ↓\nPRE-PROD\n ↓\nPROD"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What are your go-live criteria?",
"a": "For example:\n\n\nFunctional tests passed\nPerformance passed\nUAT signed off\nParallel run passed\nOperational monitoring ready\nRollback tested\nBusiness approval"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "Would you switch everything off at once?",
"a": "Usually avoid a big-bang approach for critical functionality."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How long would you keep AVS available as fallback?",
"a": "Don't give an arbitrary number—say it depends on business criticality and agreed operational criteria."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "“JVS works in DEV but fails in PROD. What do you check?”",
"a": "Think:\n\n\nConfiguration\nPermissions\nEnvironment differences\nMarket data\nReference data\nDependencies\nDeployment\nClasspath/libraries\nDatabase\nExternal systems"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "“JVS works for one trade but fails for another.”",
"a": "Investigate:\n\n* Trade type\n* Product\n* Portfolio\n* Counterparty\n* State\n* Market data\n* Optional fields\n* Null values\n* Business rules"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "“JVS produces different P&L from AVS.”",
"a": "Follow:\n\n\nSame input?\nSame market data?\nSame business date?\nSame transaction state?\nSame configuration?\nSame calculation?\nSame rounding?"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "“JVS is timing out in production.”",
"a": "Investigate:\n\n\nVolume\nAPI calls\nDB calls\nLocks\nMemory\nCPU\nExternal dependencies\nConcurrency"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "“The migration passed UAT but failed after go-live.”",
"a": "Explain your production investigation and rollback process."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What should be logged?",
"a": "Good answer:\n\n\nCorrelation/request ID\nBusiness object/trade ID\nExecution stage\nImportant inputs\nOutcome\nDuration\nError details\n\n\nAvoid logging sensitive data unnecessarily."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "How would you maintain traceability between AVS and JVS?",
"a": "A useful artefact:\n\n\nAVS Component\n ↓\nBusiness Requirement\n ↓\nJVS Component\n ↓\nTest Cases\n ↓\nUAT Evidence\n ↓\nProduction Deployment"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "What KPIs would you report?",
"a": "For example:\n\n* AVS components inventoried\n* Retired\n* Migrated\n* In testing\n* Passed\n* Failed\n* Production\n* Remaining\n* Defects\n* Performance improvement/degradation"
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "The JVS version is functionally correct but 3× slower. Would you go live?",
"a": "Don't simply answer yes/no. Explain how you'd assess business impact, root cause, risk and optimisation options."
},
{
"s": "AVS to JVS migration notes",
"o": 0,
"q": "You find that the AVS implementation itself has a bug. Should the JVS version reproduce the bug?",
"a": "Excellent question.\n\nAnswer along the lines of:\n\n> “I'd first determine whether the behaviour is actually a defect or an established business requirement. If it's a defect, I would not silently reproduce it. I'd document the difference, get business agreement on the desired behaviour, and make sure the change is explicitly tested and approved.”"
}
];
