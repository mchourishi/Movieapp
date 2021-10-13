
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>MovieApp</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">
    @yield('inline-css')
</head>
<body class="dark-mode hold-transition layout-fixed layout-navbar-fixed layout-footer-fixed sidebar-collapse">
<div id="app">
<div class="wrapper">
    @include('layouts.header')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Main content -->
        @yield('content', 'Default Content')
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    @include('layouts.footer')
</div>
<!-- ./wrapper -->

<script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
@yield('inline-js')
</div>
</body>
</html>
