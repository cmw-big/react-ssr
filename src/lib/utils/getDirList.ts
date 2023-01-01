import { join } from 'path'
import { existsSync, readdirSync, statSync } from 'fs'
/**
 * 获取某个目录下的所有文件并进行平铺
 * @param path 文件的根路径
 * @param bathPath 以当前文件为基准的所有文件路径
 * @param ext 后缀
 * @returns 返回平铺后的文件路径,以base为例
 */
export const getDirList = (
  path = __dirname,
  basePath = '',
  ext?: string | string[]
) => {
  let dirList: string[] = []
  let extList: string[]
  if (Array.isArray(ext)) {
    extList = ext
  } else {
    extList = ext ? [ext] : []
  }
  try {
    dirList = readdirSync(path)
  } catch (error) {
    console.error(`readdirSync取读失败：${(error as Error).message}`, error)
    return []
  }
  const fileList: string[] = []
  dirList.forEach(dirItem => {
    const dirPath = join(path, dirItem)
    const currentPath = join(basePath, dirItem)
    const statusDirItem = statSync(dirPath)
    if (!existsSync(dirPath)) {
      return
    }
    if (statusDirItem.isDirectory()) {
      const tempFileList = getDirList(dirPath, join(basePath, dirItem), ext)
      fileList.push(...tempFileList)
    } else {
      fileList.push(currentPath)
    }
  })
  if (ext || ext?.length) {
    return fileList.filter(file => extList.some(ext => file.endsWith(ext)))
  }

  return fileList
}
