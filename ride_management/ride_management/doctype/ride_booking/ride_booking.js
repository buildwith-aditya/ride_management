// Copyright (c) 2025, Aditya and contributors
// For license information, please see license.txt
//  (Calculated as (Price Per Km) * (Estimated Km) + (Total Amount from Services Table))
frappe.ui.form.on("Ride Booking", {
	refresh(frm) {

	},
    estimated_km(frm) {
        frm.events.calculate_totoal_amount(frm);
    },
    // services(frm) {
    //     console.log("services")
    //     frm.events.calculate_totoal_amount(frm);
    // },
    calculate_totoal_amount(frm) {
        child_tbl_amount = 0;
        if (frm.doc.services.length > 0) {
            for (let i = 0; i < frm.doc.services.length; i++) {
                child_tbl_amount += frm.doc.services[i].amount;
            }
        }
        total_amount_value = frm.doc.price_per_km * frm.doc.estimated_km + child_tbl_amount;
        frm.set_value("total_amount", total_amount_value);
    }
});
