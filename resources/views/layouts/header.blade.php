
<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-dark">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item d-none d-sm-inline-block">
            <a href="{{ route('home') }}" class="nav-link">Home</a>
        </li>
    </ul>
    <!-- SEARCH FORM -->
    <form class="form-inline ml-3" id="frmsearch" method="post" name="frmsearch" action="{{ route('movies.search') }}">
        {{ csrf_field() }}
        <div class="input-group input-group-sm">
            <input class="form-control form-control-navbar" name="search" id="search" type="search"  value="{{ old('searchVal', $searchVal ?? '') }}" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown user user-menu">
            <a class="nav-link dropdown-toggle"  data-toggle="dropdown" href="#" role="button">
                <i class="fas fa-user text-white"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-right">
                <!-- User image -->
                <li class="user-header">
                    <img src="{{ asset('img/user4-128x128.jpg') }}" class="img-circle" alt="User Image">
                    <p>
                        {{ Auth::user()->name }}
                    </p>
                </li>
                <!-- Menu Body -->
                <!-- Menu Footer-->
                <li class="user-footer">
                    <div class="pull-right">
                        <a href="{{ route('logout') }}" onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();" class="btn btn-default btn-flat sign-out">Sign out</a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</nav>
<!-- /.navbar -->
