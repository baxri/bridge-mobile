import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import AsyncStorage from '@react-native-community/async-storage'
import IStorage from 'intropath-core/utils/iStorage'

function getCompressedKey(key) {
  return key + '_compressed'
}

export async function getString(key) {
  return AsyncStorage.getItem(key)
}

export function setString(key, value) {
  return AsyncStorage.setItem(key, value)
}

export function removeString(key) {
  return AsyncStorage.removeItem(key)
}

export async function getItem(key) {
  try {
    let data = null

    const decompressedData = await getString(key)
    if (decompressedData !== null) {
      // Get decompressed data
      data = JSON.parse(decompressedData)
    } else {
      // Legacy compressed data, retrieve and set decompressed data
      // back into storage for performance reasons
      const compressedData = await getString(getCompressedKey(key))
      if (compressedData !== null) {
        data = JSON.parse(decompressFromUTF16(compressedData))
        removeString(getCompressedKey(key))
        setItem(key, data.value)
      }
    }

    return data ? data.value : null
  } catch (e) {
    return null
  }
}

export function setItem(key, value) {
  return setString(key, JSON.stringify({ value }))
}

export function removeItem(key) {
  return removeString(key)
}

export class Storage extends IStorage {
  async get(name) {
    return await getItem(name)
  }

  async set(name, val) {
    return await setItem(name, val)
  }

  async remove(name) {
    return await removeItem(name)
  }
}
