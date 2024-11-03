# Funding Rate Bot

## Description
I learned about the concept of funding rate and wanted to write this bot to capture that commission. I have studied this topic for a long time and conducted many tests. This is by no means a final product, but it showcases the use of the Binance API, WebSocket integration, and information filtering and processing.

## What does the bot do?
The bot runs scripts three times a day.

1. **Time Synchronization**: First, it synchronizes the device's time for minimal latency.
2. **Data Retrieval**: Next, it fetches fresh information from the exchange and selects the most profitable trading pair.
3. **Order Execution**: It prepares and sequentially executes three orders:
   - The first order opens a position to capture the funding rate.
   - The second order closes the first order and opens an opposite position to profit from subsequent movements.
   - The third order closes the positions.

