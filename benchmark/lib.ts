import autocannon from 'autocannon'
import { fork } from 'node:child_process'
import path from 'node:path'
import { access, mkdir, writeFile } from 'node:fs/promises'
import ora from 'ora'
import type { Result } from 'autocannon'

const writeResults = async (handler: string, result: Result) => {
  const resultsDirectory = path.join(process.cwd(), 'benchmark/results')
  try {
    await access(resultsDirectory)
  } catch (e) {
    await mkdir(resultsDirectory)
  }

  const dest = path.join(resultsDirectory, `${handler}.json`)
  await writeFile(dest, JSON.stringify(result, null, 2))
}

const fire = async (handler: string, save: boolean) => {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 100,
    duration: 40,
    pipelining: 10,
  })
  return save ? writeResults(handler, result) : null
}

const benchSingleFramework = async (handler: string) => {
  const spinner = ora(`Started ${handler}`).start()
  const forked = fork(
    path.join(__dirname, '..', 'benchmark/frameworks', handler)
  )
  try {
    spinner.color = 'magenta'
    spinner.text = `Warming ${handler}`
    await fire(handler, false)
  } catch (error) {
    return console.log(error)
  } finally {
    spinner.color = 'yellow'
    spinner.text = `Working ${handler}`
  }

  try {
    await fire(handler, true)
    forked.kill('SIGINT')
    spinner.text = `Results saved for ${handler}`
    spinner.succeed()
    return true
  } catch (error) {
    return console.log(error)
  }
}

export { benchSingleFramework }
