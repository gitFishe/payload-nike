import 'dotenv/config' // Автоматично підтягує .env
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const dir = path.join(process.cwd(), 'import-data')

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))

  for (const file of files) {
    console.log(`\n📂 Обробка файлу: ${file}`)
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'))

    for (const item of data) {
      try {
        await payload.create({
          collection: 'products',
          data: {
            title: item['Title'],
            subTitle: item['SubTitle'],
            productType: item['Product Type'],
            productCode: item['Product Code'],
            productUrl: item['Product Url'],
            currency: item['Currency'] || 'USD',
            currentPrice: item['Current Price'],
            discountPercentage: item['Discount Percentage'],
            imageUrl: item['Image URL'],
            initialPrice: item['Initial Price'],
          },
        })
        console.log(`  ✅ Додано: ${item['Title']}`)
      } catch (error: any) {
        // Якщо це помилка дублікату (унікальності)
        if (error?.data?.errors?.[0]?.message === 'Value must be unique') {
          console.log(`  ⚠️ Пропущено (дублікат артикулу): ${item['Product Code']}`)
        } else {
          // Якщо якась інша помилка (наприклад, немає обов'язкового поля)
          console.log(`  ❌ Помилка для ${item['Title']}:`, error.message)
        }
      }
    }
  }

  console.log('\n🎉 Імпорт завершено!')
  process.exit(0)
}

run()
