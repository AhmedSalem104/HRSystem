function Delete(Id, gridTable) {
   
    Swal.fire({
        title: '<strong>هل تريد حذف هذا الحقل</strong>',
        type: 'warning',
        html: ' ',

        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'نعم',
        confirmButtonAriaLabel: '',
        cancelButtonText: 'لا',
        cancelButtonAriaLabel: '',
        confirmButtonClass: 'btn btn-primary',
        buttonsStyling: false,
        cancelButtonClass: 'btn btn-danger ml-1',
    })
    $('.swal2-confirm').on('click', function () {
        
        debugger;
        $.ajax({
            type: "Post",
            url: Variables.DeleteUrl,
            data: { id: Id },
            success: function (data) {

                if (data.ok == true) {
                    var table = $('#' + gridTable + '').DataTable();
                    table.ajax.reload(null, false);
                    Swal.fire({
                        type: "success",
                        title: 'حذف!',
                        text: 'تم الحذف بنجاح',
                        confirmButtonClass: 'btn btn-success',
                    })
                }

            }

        });
    });
}

 