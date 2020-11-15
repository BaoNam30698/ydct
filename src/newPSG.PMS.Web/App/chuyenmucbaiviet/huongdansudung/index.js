﻿(function () {
    appModule.controller('chuyenmucbaiviet.huongdansudung.index', [
        '$rootScope', '$scope', '$filter', '$uibModal', '$stateParams', 'uiGridConstants', 'abp.services.app.category', 'abp.services.app.article', 'appSession',
        function ($rootScope, $scope, $filter, $uibModal, $stateParams, uiGridConstants, categoryService, articleService, appSession) {
            //variable
            var vm = this;
            vm.ROLE_LEVEL = app.ROLE_LEVEL;
            vm.currentUser = angular.copy(appSession.user);
            console.log(vm.currentUser, 'vm.currentUser', vm.ROLE_LEVEL, 'vm.ROLE_LEVEL');
            vm.loading = false;
            vm.lstCategory = [];
            vm.lstArticle = [];
            vm.article = [];

            vm.reloadTree = function(){
                setTimeout(function () {
                    $('.tree-toggler').on('click',function () {
                        $(this).parent().children('ul.tree').slideToggle(300);
                    });
                }, 3000);
            };

            vm.Refresh = function () {
                vm.loading = true;
                categoryService.allCategoryItems(vm.currentUser.level)
                    .then(function (result) {
                        vm.lstCategory = result.data;
                        vm.article = vm.lstCategory[0];

                        vm.reloadTree();
                    }).finally(function () {
                        vm.loading = false;
                    });
            };
            vm.Refresh();
            

            vm.openEditCategoryModal = function (category) {
                if (category) {
                    var modalInstance = $uibModal.open({
                        templateUrl: '~/App/chuyenmucbaiviet/huongdansudung/category/createOrEditModal.cshtml',
                        controller: 'chuyenmucbaiviet.huongdansudung.category.createOrEditModal as vm',
                        backdrop: 'static',
                        windowClass: 'full-screen-modal',
                        resolve: {
                            category: category
                        }
                    });

                    modalInstance.result.then(function (result) {
                        vm.Refresh();
                    });
                }
            };

            vm.openEditArticleModal = function (article) {
                if (article) {
                    var modalInstance = $uibModal.open({
                        templateUrl: '~/App/chuyenmucbaiviet/huongdansudung/article/createOrEditModal.cshtml',
                        controller: 'chuyenmucbaiviet.huongdansudung.article.createOrEditModal as vm',
                        backdrop: 'static',
                        resolve: {
                            article: article
                        }
                    });

                    modalInstance.result.then(function (result) {
                        vm.Refresh();
                    });
                }
            };

            vm.openEditNhanh = function (item) {
                if (item.categoryId) {
                    vm.openEditArticleModal(item);
                }
                else {
                    vm.openEditCategoryModal(item);
                }
            };

            vm.showArticle = function (article) {
                vm.article = angular.copy(article);
            };
            vm.showCategory = function (category) {
                vm.article = angular.copy(category);
            };
            $scope.filterId = function (actual, expected) {
                return actual == expected;
            };

            vm.taoLinkHDSD = function () {
                abp.message.confirm(
                    "ADMIN",
                    "Bạn chắc chắn muốn tạo?",
                    function (isConfirmed) {
                        if (isConfirmed) {
                            vm.loading = true;
                            categoryService.taoLinkHDSD()
                                .then(function (result) {
                                    vm.Refresh();
                                }).finally(function () {
                                    vm.loading = false;
                                });
                        }
                    }
                );
            };
            
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

        }
    ]);
})();