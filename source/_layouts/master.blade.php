@extends('_layouts.base')

@section('body')
<header id="main-header">
  <a href="javascript:;"
     class="btn-dash"
     :class="{'open': sidebar.displaying}"
     id="btn-call-sidebar"
     @click="callSidebar()">
    <span></span>
    <span></span>
    <span></span>
  </a>
  <nav id="top-nav" class="container">
    <h1 class="header-title">@yield('header::title', 'PHPRio')</h1>
  </nav>
</header>

  <div id="main">
    <header id="page-header">
      <h2>A melhor comunidade de PHP do Rio de Janeiro ;)</h2>
    </header>

    <div class="container" id="main-content">
      @yield('main::content')
    </div>
  </div>
@endsection
