<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'

const payments = [
  { id: 'm5gr84i9', amount: 316, status: 'نجاح', email: 'ken99@example.com' },
  { id: '3u1reuv4', amount: 242, status: 'قيد المعالجة', email: 'abe45@example.com' },
  { id: 'derv1ws0', amount: 837, status: 'معلق', email: 'monserrat44@example.com' },
]
</script>

<template>
  <div dir="rtl" class="w-full max-w-xl">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>البريد الإلكتروني</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead class="text-right">المبلغ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="payment in payments" :key="payment.id">
          <TableCell>{{ payment.email }}</TableCell>
          <TableCell>{{ payment.status }}</TableCell>
          <TableCell class="text-right">{{ payment.amount }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
