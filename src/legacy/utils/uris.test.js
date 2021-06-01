import { parsePastelURI } from './uris'

test('ZIP321 case 1', () => {
  const targets = parsePastelURI(
    'pastel:ps1j6mps3f4e8h7ydeplekqm4zpcyuqkcw8vyka3vyjvl8l5rszwstafe3z0vmem7m5vq36wa4ghxd?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase',
  )
  expect(targets.length).toBe(1)
  expect(targets[0].address).toBe(
    'ps1j6mps3f4e8h7ydeplekqm4zpcyuqkcw8vyka3vyjvl8l5rszwstafe3z0vmem7m5vq36wa4ghxd',
  )
  expect(targets[0].message).toBe('Thank you for your purchase')
  expect(targets[0].label).toBeUndefined()
  expect(targets[0].amount).toBe(1)
  expect(targets[0].memoString).toBe('This is a simple memo.')
})

test('ZIP321 case 2', () => {
  const targets = parsePastelURI(
    'pastel:?address=Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N&amount=123.456&address.1=ps1j6mps3f4e8h7ydeplekqm4zpcyuqkcw8vyka3vyjvl8l5rszwstafe3z0vmem7m5vq36wa4ghxd&amount.1=0.789&memo.1=VGhpcyBpcyBhIHVuaWNvZGUgbWVtbyDinKjwn6aE8J-PhvCfjok',
  )
  expect(targets.length).toBe(2)
  expect(targets[0].address).toBe('Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N')
  expect(targets[0].message).toBeUndefined()
  expect(targets[0].label).toBeUndefined()
  expect(targets[0].amount).toBe(123.456)
  expect(targets[0].memoString).toBeUndefined()
  expect(targets[0].memoBase64).toBeUndefined()
  expect(targets[1].address).toBe(
    'ps1j6mps3f4e8h7ydeplekqm4zpcyuqkcw8vyka3vyjvl8l5rszwstafe3z0vmem7m5vq36wa4ghxd',
  )
  expect(targets[1].message).toBeUndefined()
  expect(targets[1].label).toBeUndefined()
  expect(targets[1].amount).toBe(0.789)
  expect(targets[1].memoString).toBe('This is a unicode memo ✨🦄🏆🎉')
})
test('bad uris', () => {
  // bad protocol
  let error = parsePastelURI(
    'badprotocol:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N?amount=123.456',
  )
  expect(typeof error).toBe('string') // bad address

  error = parsePastelURI('pastel:badaddress?amount=123.456')
  expect(typeof error).toBe('string') // no address

  error = parsePastelURI('pastel:?amount=123.456')
  expect(typeof error).toBe('string') // no amount

  error = parsePastelURI('pastel:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N')
  expect(typeof error).toBe('string') // bad param name

  error = parsePastelURI(
    'pastel:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N?badparam=3',
  )
  expect(typeof error).toBe('string') // index=1 doesn't have amount

  error = parsePastelURI(
    'pastel:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N?amount=2&address.1=Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N',
  )
  expect(typeof error).toBe('string') // duplicate param

  error = parsePastelURI(
    'pastel:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N?amount=3&amount=3',
  )
  expect(typeof error).toBe('string') // bad index

  error = parsePastelURI(
    'pastel:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N?amount=2&address.a=Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N&amount.a=3',
  )
  expect(typeof error).toBe('string') // index=1 is missing

  error = parsePastelURI(
    'pastel:Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N?amount=0.1&address.2=Ptoa7wzPukrjfvakak3AZt23Netb5whHE7N&amount.2=2',
  )
  expect(typeof error).toBe('string')
})
