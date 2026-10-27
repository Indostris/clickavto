export const SMS_CODE = '420111';
export function validateDocument(series, number) {
  if (!/^[A-Z]{3}$/.test(series)) return {series:'Неверный формат серии'};
  if (!/^\d{7}$/.test(number)) return {number:'Неверный формат номера'};
  if (series !== 'AAC' || number !== '1234567') return {series:'Данные техпаспорта не совпадают',number:'Данные техпаспорта не совпадают'};
  return {};
}
export function checkSms(code, attempts, scenario='normal') {
  if(scenario==='restricted')return {modal:'restricted'};
  if(scenario==='expired')return {error:'Срок действия кода истёк. Запросите новый',resend:true};
  if(code===SMS_CODE)return {success:true};
  if(attempts>=2)return {error:'Слишком много попыток. Запросите новый код',resend:true};
  return {error:'Неверный код подтверждения'};
}
export function checkPin(value, saved, attempts) {
  if(value===saved)return {success:true};
  const next=attempts+1;
  return {attempts:next,locked:next>=5,warning:next===4,error:next>=5?'Попробовать снова можно через 10 минут':'PIN введен неверно'};
}
