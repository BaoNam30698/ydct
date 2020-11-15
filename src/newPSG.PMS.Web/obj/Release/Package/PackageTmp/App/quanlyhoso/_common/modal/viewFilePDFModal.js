﻿(function () {
    appModule.controller('quanlyhoso.common.modal.viewFilePDFModal', [
        '$scope', '$sce', '$uibModalInstance', 'modalData',
        function ($scope, $sce, $uibModalInstance, modalData) {
            var vm = this;

            vm.title = modalData.title;
            vm.pathPDF = "/File/GoToViewTaiLieu?url=" + modalData.pathPDF;

            if (modalData.isTemplate) {
                vm.pathPDF = modalData.pathPDF;
            }

            vm.init = function () {
                console.log(modalData, 'modalData', vm.pathPDF, 'vm.pathPDF');
            }
            vm.init();

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            //Function
            vm.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }
        }
    ]);
})();