import { NextRequest, NextResponse } from 'next/server';

interface BookingRecord {
  booking_id: string;
  guest_name: string;
  check_in_date: string;
  check_out_date: string;
  room_type: string;
  contact_information: {
    email: string;
  };
  payment: {
    total_amount: number;
    balance_paid: number;
    payment_due: boolean;
    outstanding_amount: number;
  };
}

function getBalances({
  data,
  paymentDue,
}: {
  data: BookingRecord[];
  paymentDue: boolean;
}) {
  const outstandingRecords = data.filter(
    (record) => record.payment.payment_due === paymentDue
  );
  return outstandingRecords;
}

async function getBookings(): Promise<BookingRecord[]> {
  const apiKey = '12345';
  const apiUrl = 'http://localhost:3001/data';

  const headers = new Headers();
  headers.append('Authorization', `ChaletManager-Key ${apiKey}`);
  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await getBookings();
    const filterUnpaid = getBalances({ data, paymentDue: false });
    return NextResponse.json(filterUnpaid);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.error();
  }
}
