export function makeOptions(type, data) {
    return {
      method: type,
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  }