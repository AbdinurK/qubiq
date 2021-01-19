export const transformation = deals => {
    let arr = []
    deals.map(deal => arr.push({
        id: deal.iddeals,
        employee1: `${deal.advertisement?.employeesid?.name ? deal.advertisement?.employeesid?.name : ''} ${deal.advertisement?.employeesid?.surname}`,
        employee2: `${deal.customer?.employeesid?.name ? deal.customer?.employeesid?.name : ''} ${deal.customer?.employeesid?.surname ? deal.customer.employeesid.surname : ''}`,
        deal_date: new Date(deal.transaction_date),
        start_commission_date: new Date(deal.date_of_deposit),
        end_commission_date: new Date(deal.expiration_date_of_deposit),
        address: `${deal.advertisement?.parameters?.street} ${deal.advertisement?.parameters?.house_number }`,
        price: `${deal.advertisement?.parameters?.cost}`,
        owner: deal.advertisement?.parameters?.owner_card?.name,
        customer: `${deal?.customer?.name} ${ deal.customer?.surname ? deal.customer?.surname : ''  }`,
        commission: deal.amount_of_deposit,
        owner_money: deal.amount_of_deposit,
        customer_money: deal.customer_commission,
        owner_phone: deal.advertisement?.parameters?.owner_card?.phone_number,
        customer_phone: deal.customer?.phone_number !== "NULL" ? deal.customer?.phone_number : 'отсутствует' ,
        deal_type: deal.status,
        payment: deal.customer?.payment_type,
        bank: deal.customer?.bank === null ? 'наличные' :  deal.customer?.bank,
        pledged_bank: deal.advertisement?.parameters?.pledged_bank === null ? 'Не в залоге' :  deal.advertisement?.parameters?.pledged_bank
    }))
    return arr
}
