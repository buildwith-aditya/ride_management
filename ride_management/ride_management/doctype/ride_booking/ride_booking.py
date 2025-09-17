# Copyright (c) 2025, Aditya and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate

class RideBooking(Document):
	
	def validate(self):
		self.validate_dates()
		self.calculate_total_amount()

	def validate_dates(self):
		if getdate(self.booking_date) > getdate(self.return_date):
			frappe.throw("Booking Date cannot be greater than Return Date")

	def calculate_total_amount(self):
		child_tbl_amount = 0
		if self.services:
			for service in self.services:
				child_tbl_amount += service.amount
		self.total_amount = self.price_per_km * self.estimated_km + child_tbl_amount
