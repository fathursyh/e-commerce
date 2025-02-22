
declare namespace App {
    interface Locals {
        auth: boolean,
        user_id?: string,
        email?: string,
        cartUpdate: boolean,
    }
}

interface Window {
    snap: {
        pay: (...arg) => void
    }
  }